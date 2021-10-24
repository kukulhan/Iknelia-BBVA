import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from '../screens/LoginScreen';

import { SuccessfulTransferView } from '../screens/SuccessfulTransferView';
import { NoAssistantView } from '../screens/NoAssistantView';
import { MainUserView } from '../screens/MainUserView';
import { HistoryScreen } from '../screens/HistoryScreen';



const Stack = createStackNavigator();

export const Navigation = () => {
    return(
        <Stack.Navigator 
            screenOptions = {{
                headerShown: false,
                cardStyle:{
                    backgroundColor: 'white'
                }
            }}
        >

            <Stack.Screen name = 'Login' component = {LoginScreen}/>
            <Stack.Screen name = 'NoAssistant' component = {NoAssistantView}/>
            <Stack.Screen name = 'Assistant' component = {MainUserView}/>
            <Stack.Screen name = 'TransferSuccessful' component = {SuccessfulTransferView}/>
            <Stack.Screen name = 'History' component = {HistoryScreen}/>
        </Stack.Navigator>
    );
}