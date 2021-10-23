import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';

interface Props{
    title: string;
}

export const HeaderTitle = ({title}:Props) => {
    const {top} = useSafeAreaInsets();
    return (
        <View style = {{marginTop: top + 20, marginBottom: 20}}>
            <Text style={{fontSize:30, color:'white'}}>{ title }</Text>
        </View>
    )
}
