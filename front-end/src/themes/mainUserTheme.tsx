import { StyleSheet } from 'react-native';
import { ikneliaColors } from '../styles/iknealiaColors';
import { ikneliaFonts } from '../styles/ikneliaFonts';

export const mainUserTheme = StyleSheet.create({
    container: { 
        flex:1,
        paddingVertical: 10,
        backgroundColor: ikneliaColors.ikneliaBackground
    },
    imageContainer:{
        marginBottom:35,
        alignItems: 'center',
    },
    nerdImage: {
        width: 100,
        height: 100,
        backgroundColor: 'transparent'
    },
    micImage:{
        width: 100,
        height: 100,
        backgroundColor: 'transparent'
    },
    amounts: { 
        color: ikneliaColors.ikneliaText, 
        fontWeight:'bold' ,
        fontFamily: ikneliaFonts.primaryRegular,
        fontSize: 30, 
        textAlign:'center'
    },
    availableText: { 
        color: ikneliaColors.ikneliaText,
        fontFamily: ikneliaFonts.primaryRegular,
        fontSize: 30, 
        textAlign:'center'
    },
    textContainer: {
        alignItems: 'center',
        marginBottom:25
    },
    micContainer: {
        position:'absolute',
        bottom:60,
        alignSelf:'center'
    }
});