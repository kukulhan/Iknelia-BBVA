import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from '../screens/LoginScreen';
import { NoAssistantView } from '../screens/NoAssistantView';
import { SuccessfulTransferView } from '../screens/SuccessfulTransferView';

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
            <Stack.Screen name = 'TransferSuccessful' component = {SuccessfulTransferView}/>
        </Stack.Navigator>
    );
}