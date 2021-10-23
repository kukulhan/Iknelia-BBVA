import React from 'react'
import { View, useWindowDimensions } from 'react-native';
import { ikneliaColors } from '../styles/iknealiaColors';

export const Background = () => {

    const {height} = useWindowDimensions();

    return (
        <View 
            style={{
                position:'absolute',
                backgroundColor: ikneliaColors.ikneliaBackground,
                top: height >= 530 ? -530: -580,
                alignSelf:'center',
                width: 1100,
                height: 1100,
                transform:[{
                    rotate: '-70deg'
                }]
            }}
        />
    )
}
