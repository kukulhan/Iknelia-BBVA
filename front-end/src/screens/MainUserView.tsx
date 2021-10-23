import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, Button} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { mainUserTheme } from '../themes/mainUserTheme';


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
            </View>
        </View>
    )
}
