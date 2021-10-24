import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SuccessfulTransferTheme } from '../themes/successfulTransferTheme';
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

    const goToHome = (() => {
        navigation.navigate('Assistant');
    })

    return (
        <View style={SuccessfulTransferTheme.container}>
            <View style={SuccessfulTransferTheme.charge} >
                <Text style={SuccessfulTransferTheme.mainText}>000</Text>
            </View>
            <View style={SuccessfulTransferTheme.successfulTransfer}>
                <Text style={SuccessfulTransferTheme.mainTextSuccess}>Transferencia exitosa</Text>
                <Text style={SuccessfulTransferTheme.subText}>000</Text>
                <Text style={SuccessfulTransferTheme.amount}>
                    <Text style={SuccessfulTransferTheme.textUp}>$</Text>
                    <Text>000</Text>
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
                <Text style={SuccessfulTransferTheme.accountInf}>00000</Text>
            </View>
            <View style={SuccessfulTransferTheme.personeTwo}></View>
            <View style={SuccessfulTransferTheme.personeTwoView}>
                <Text style={SuccessfulTransferTheme.personeTwoText}> 000 </Text>
                <Text style={SuccessfulTransferTheme.accountTitle}>0000</Text>
                <Text style={SuccessfulTransferTheme.accountInf}>00000</Text>
            </View>
            <View style={SuccessfulTransferTheme.concept} >
                <Text style={SuccessfulTransferTheme.accountInf}>Concepto</Text>
                <Text style={SuccessfulTransferTheme.conceptInf}>0000</Text>
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


