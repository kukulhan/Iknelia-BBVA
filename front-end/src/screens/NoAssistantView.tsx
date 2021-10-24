import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { noAssistantTheme } from '../themes/noAssistantTheme';

const transferenciaIcon = require('../assets/images/pages/transferencia2.png');
const recargaIcon = require('../assets/images/pages/recarga2.png');
const retiroIcon = require('../assets/images/pages/retiro2.png');


export const NoAssistantView = () => {

    return(
        <View style={noAssistantTheme.container}>
            <View style={noAssistantTheme.row}>
                <TouchableOpacity style={noAssistantTheme.item}>
                    <Image
                        resizeMode="contain"
                        source={transferenciaIcon}
                        style={noAssistantTheme.itemImage}
                    />
                    <Text style={noAssistantTheme.itemText}>Transferencia</Text>
                </TouchableOpacity>
                <TouchableOpacity style={noAssistantTheme.item}>
                    <Image
                        resizeMode="contain"
                        source={retiroIcon}
                        style={noAssistantTheme.itemImage}
                    />
                    <Text style={noAssistantTheme.itemText}>Retiro sin tarjeta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={noAssistantTheme.item} >
                    <Image
                        resizeMode="contain"
                        source={recargaIcon}
                        style={noAssistantTheme.itemImage}
                    />
                    <Text style={noAssistantTheme.itemText}>Recarga</Text>
                </TouchableOpacity>
            </View>
            <View style={noAssistantTheme.divider} />
                <View style={noAssistantTheme.textContainer}>
                    <TouchableOpacity style={noAssistantTheme.amountItem}>
                        <Text style={noAssistantTheme.availableText}>Cuenta</Text>
                        <Text style={noAssistantTheme.amounts}>$300</Text>
                    </TouchableOpacity>
                </View>
            <View style={noAssistantTheme.textContainer}>
                <TouchableOpacity style={noAssistantTheme.amountItem}>
                    <Text style={noAssistantTheme.availableText}>TDC Saldo</Text>
                    <Text style={noAssistantTheme.amounts}>$16,589</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}