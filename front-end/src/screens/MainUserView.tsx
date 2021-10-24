import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, Button} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { mainUserTheme } from '../themes/mainUserTheme';
import Voice, { SpeechRecognizedEvent, SpeechResultsEvent, SpeechErrorEvent } from '@react-native-voice/voice';
import Tts from 'react-native-tts';

interface Props extends StackScreenProps<any, any> {};

interface userProps{
    text: string;
}

interface getText {
    message: string;
}
export const MainUserView = ({ navigation}: Props, propUser:userProps) => {

    const goToSuccesfulT = (() => {
        navigation.navigate('TransferSuccessful');
    })
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
    }
    const startSpeech = ((texto: string) => {
        Tts.stop();
        Tts.speak(texto);
        console.log("hablando")
    })
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
                    <Text style={mainUserTheme.amounts} >$ 000  </Text>

                </View>
                <View style={mainUserTheme.textContainer}>
                    <Text style={mainUserTheme.availableText}>TDC Saldo</Text>
                    <Text style={mainUserTheme.amounts}>$  00 </Text>
                 
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
