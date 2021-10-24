import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, Button} from 'react-native';
import { mainUserTheme } from '../themes/mainUserTheme';;
import { StackScreenProps } from '@react-navigation/stack';
import Voice, { SpeechRecognizedEvent, SpeechResultsEvent, SpeechErrorEvent } from '@react-native-voice/voice';
import Tts from 'react-native-tts';
import { useGetAmount } from '../hooks/useGetAmount';
import { useDeleteSession } from '../hooks/useDeleteSession';
import awsLexAPI from "../api/lexAPI"
import awsLexIkneliaAPI from '../api/lexInleliaAPI';


Tts.setDefaultLanguage('es-MX');
Tts.setDefaultRate(0.6);

interface Props extends StackScreenProps<any, any> {};

interface userProps{
    text: string;
}

interface getText {
    message: string;
}
export const MainUserView = ({ navigation}: Props, propUser:userProps) => {

    const { stateAmount, getAmount } = useGetAmount();
    const { stateDelete} = useDeleteSession();

    console.log(propUser.text);
    useEffect(() => {
        Voice.destroy().then(Voice.removeAllListeners);
        getAmount();
    }, [])

    const startRecording = async () => {
        try {
            await Voice.start('es-MX');

        } catch (e) {
            console.error("Error" + e);
        }
    }
    const silenceTimer = setTimeout(() => {
        Voice.stop();
    }, 1000)
    Voice.onSpeechResults = (e: SpeechResultsEvent) => {
        clearTimeout(silenceTimer);
        console.log(e.value![0])
        executeAlexa(e.value![0].normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace("$","") );
    }
    const goToSuccesfulT = (() => {
        navigation.navigate('TransferSuccessful');
    })
    const startSpeech = ((texto: string) => {
        Tts.stop();
        Tts.speak(texto);
        console.log("hablando")
    })
 
    const executeAlexa = async (putMessage: string) => {
        console.log(">>>>>>><"+putMessage)
        await awsLexAPI().get<any>('/Prod/getsession/12345678').then(async (getStatusSession) => {
            if (getStatusSession.status === 200) {
                await awsLexIkneliaAPI().post<getText>('/Prod/alexiknelia', { user: '123456678', mensaje: putMessage }).then(responseText => {
                    console.log(responseText.data.message);
                    var dataMessage = responseText.data.message;
                    if (dataMessage.includes('|')){
                        //dataMessage = dataMessage.split('|')[1];
                        dataMessage="";
                    }
                    startSpeech(dataMessage);
                    if (responseText.data.message.includes('exitosamente')) {
                        getAmount();
                        goToSuccesfulT();
                    }
                    if (responseText.data.message.includes('Te muestro tu historial')){
                        navigation.navigate('History', {text:responseText.data.message,textNoData:'No hay movimientos en la fecha solicitada.'});
                    }
                })
            }
        }).catch(async () => {
            await awsLexAPI().put<any>('/Prod/putsession', { user: '12345678' }).then(async (putStatusSession) => {
                if (putStatusSession.status === 200) {
                    await awsLexIkneliaAPI().post<getText>('/Prod/alexiknelia', { user: '123456678', mensaje: putMessage }).then(responseText => {
                        console.log(responseText.data.message);
                        startSpeech(responseText.data.message);
                    })
                }
            })
        });
    }
    return (
        <View style={mainUserTheme.container}>
            <View style={mainUserTheme.imageContainer}>
                <Image
                    source={require('../assets/images/mihu.gif')}
                    style={mainUserTheme.nerdImage}
                />
                <View style={mainUserTheme.textContainer}>
                    <Text style={mainUserTheme.availableText}>¿Qué deseas hacer?</Text>
                </View>
            </View>
            <View>
                <View style={mainUserTheme.textContainer}>
                    <Text style={mainUserTheme.availableText}>Cuenta</Text>
                    <Text style={mainUserTheme.amounts} >$ {stateAmount.tddAmount}  </Text>

                </View>
                <View style={mainUserTheme.textContainer}>
                    <Text style={mainUserTheme.availableText}>TDC Saldo</Text>
                    <Text style={mainUserTheme.amounts}>$  {stateAmount.tdcCreditLine}  </Text>
                 
                </View>
            </View>
            <View style={mainUserTheme.micContainer}>
                <TouchableOpacity onPress={startRecording}>
                    <Image
                        source={require('../assets/images/mic.gif')}
                        style={mainUserTheme.micImage}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}
