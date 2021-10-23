import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from '../screens/LoginScreen';

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
        </Stack.Navigator>
    );
}