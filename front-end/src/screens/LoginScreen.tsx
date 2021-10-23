import  React from 'react'
import { Keyboard, KeyboardAvoidingView, Text, View } from 'react-native';
import { Switch, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Background } from '../components/Background';
import { Logo } from '../components/Logo';
import { loginStyles } from '../themes/loginTheme';
import { useLogin } from '../hooks/useLogin';
import { StackScreenProps } from '@react-navigation/stack';
import {useState} from 'react';

export const LoginScreen = ({navigation}:Props) => {

    const [isEnable, setIsEnable] = useState(false);
    const onSwitch = () => setIsEnable(!isEnable);

    const {email, password, onChange} =  useLogin({
        email: '',
        password: ''
    });

    const onLogin = () => {
        console.log({email, password})
        Keyboard.dismiss();
        (isEnable)? navigation.replace('Assistant'):navigation.replace('NoAssistant')
    }

    return (
        <>
            <Background/>
                <KeyboardAvoidingView
                    style={{flex:1}}
               // behavior='padding'
                >
                <View style = {loginStyles.loginContainer}>
                    <Logo/>
                    <Text style = {loginStyles.title}> Hola</Text>
                    <Text style = {loginStyles.label}> Usuario</Text>
                    <TextInput
                        placeholder='Ingrese su email'
                        placeholderTextColor='rgba(255,255,255,0.4)'
                        keyboardType='email-address'
                        underlineColorAndroid='white'
                        style = {loginStyles.inputField}
                        onChangeText = { (value) => onChange(value, 'email')}
                        value = {email}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                    <TextInput
                        placeholder='Ingrese su contraseña'
                        placeholderTextColor='rgba(255,255,255,0.4)'
                        keyboardType='default'
                        secureTextEntry={true}
                        underlineColorAndroid='white'
                        style = {loginStyles.inputField}
                        onChangeText = { (value) => onChange(value, 'password')}
                        value = {password}
                        autoCapitalize='none'
                        autoCorrect={false}
                        onSubmitEditing={onLogin}
                    />
                    <View style = {loginStyles.buttomContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style = {loginStyles.buttomLogin} 
                            onPress = {onLogin}
                        >
                             
                            <Text style = {loginStyles.textLogin} >Entrar</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Switch
                            trackColor={{false:'#ffffff', true:'#1971c2'}}
                            thumbColor={'#ced4da'}
                            onValueChange={onSwitch}
                            value={isEnable}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}

