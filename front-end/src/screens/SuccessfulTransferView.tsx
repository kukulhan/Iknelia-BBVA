import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SuccessfulTransferTheme } from '../themes/successfulTransferTheme';
import awsIkneliaAPI from '../api/ikneliaAPI';
import { useState, useEffect, useRef } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> { };

export const SuccessfulTransferView = ({ navigation }: Props) => {


    interface Transfer {
        date: string;
        amount: string;
        dateSamll: string;
        concept: string;
        accountType: string;
        contact: string;
        account: string;
        transactionId: string;
    }

    const [stateTransfer, setStateTransfer] = useState<Transfer>({
        date:'',
        amount:'',
        dateSamll:'',
        concept:'',
        accountType:'',
        contact:'',
        account:'',
        transactionId:''
    });

    const executeSuccessfulTransfer = async () => {
        await awsIkneliaAPI().get<Transfer>('/Prod/getlasttransaction/12345678').then(responseTransfer => {
            if (responseTransfer.status === 200) {
                setStateTransfer({
                    date:responseTransfer.data.date,
                    amount: responseTransfer.data.amount,
                    dateSamll: responseTransfer.data.dateSamll,
                    concept: responseTransfer.data.concept,
                    accountType: responseTransfer.data.accountType,
                    contact: responseTransfer.data.contact,
                    account: responseTransfer.data.account,
                    transactionId: responseTransfer.data.transactionId
                })
            }
        })
    }

    const isMountedT = useRef(true);

    useEffect(() => {
        if (!isMountedT.current) return;
        executeSuccessfulTransfer();
        return () => {
            isMountedT.current = false;
        }
    }, [])

    const goToHome = (() => {
        navigation.navigate('Assistant');
    })

    return (
        <View style={SuccessfulTransferTheme.container}>
            <View style={SuccessfulTransferTheme.charge} >
                <Text style={SuccessfulTransferTheme.mainText}>Cargo a tu cuenta *{stateTransfer.account.substring(stateTransfer.account.length-4, stateTransfer.account.length)} de {stateTransfer.amount}.00 </Text>
            </View>
            <View style={SuccessfulTransferTheme.successfulTransfer}>
                <Text style={SuccessfulTransferTheme.mainTextSuccess}>Transferencia exitosa</Text>
                <Text style={SuccessfulTransferTheme.subText}>{stateTransfer.date}</Text>
                <Text style={SuccessfulTransferTheme.amount}>
                    <Text style={SuccessfulTransferTheme.textUp}>$</Text>
                    <Text>{stateTransfer.amount}</Text>
                    <Text style={SuccessfulTransferTheme.textUp}>.00</Text>
                </Text>
                <Text style={SuccessfulTransferTheme.subText}> Esta transferencia no genera comisión</Text>
                <Text style={{ marginBottom: 25 }}>  </Text>
            </View>
            <View style={SuccessfulTransferTheme.peopleMain}>
                <View style={SuccessfulTransferTheme.people}></View>
            </View>
            <View style={SuccessfulTransferTheme.personeOne}>
                <Image style={SuccessfulTransferTheme.avatar} source={require('../assets/images/heberillo.jpg')} />
                <Text style={SuccessfulTransferTheme.accountTitle}>Cuenta</Text>
                <Text style={SuccessfulTransferTheme.accountInf}>*{stateTransfer.account.substring(stateTransfer.account.length-4, stateTransfer.account.length)}</Text>
            </View>
            <View style={SuccessfulTransferTheme.personeTwo}></View>
            <View style={SuccessfulTransferTheme.personeTwoView}>
                <Text style={SuccessfulTransferTheme.personeTwoText}> {stateTransfer.contact.substring(0,2).toLocaleUpperCase()} </Text>
                <Text style={SuccessfulTransferTheme.accountTitle}>{stateTransfer.contact.charAt(0).toUpperCase()+stateTransfer.contact.slice(1) }</Text>
                <Text style={SuccessfulTransferTheme.accountInf}>{(stateTransfer.accountType === 'tdd')? 'Tarjeta de Débito ': 'Tarjeta de Crédito'}</Text>
            </View>
            <View style={SuccessfulTransferTheme.concept} >
                <Text style={SuccessfulTransferTheme.accountInf}>Concepto</Text>
                <Text style={SuccessfulTransferTheme.conceptInf}>{stateTransfer.concept}</Text>
            </View>
            <TouchableOpacity  style={SuccessfulTransferTheme.backButtom} onPress={goToHome}>
                <Icon
                    color='#044483'
                    name='arrow-back-outline'
                    size={45}
                />
            </TouchableOpacity>
        </View>
    )
}


