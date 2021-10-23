import React from 'react'
import { Image, View } from 'react-native';

export const Logo = () => {
    return (
        <View style = {{alignItems: 'center'}}>
            <Image
                source={require('../sources/logo.png')}
                style={{
                    width: 230,
                    height: 230,
                    top:-15,
                    resizeMode:'contain'
                }}
            />   
        </View>
    )
}
