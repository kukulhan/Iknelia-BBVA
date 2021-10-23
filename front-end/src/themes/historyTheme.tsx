import { StyleSheet } from 'react-native';
import { ikneliaColors } from '../styles/iknealiaColors';

export const historyStyles = StyleSheet.create({
    containerHistory: {
        flex:1,
        paddingHorizontal: 15,
        paddingVertical:80,
        backgroundColor: ikneliaColors.ikneliaBackground
    },
    containerHeader: {
        alignSelf:'center'
    },
    containerBody:{
        marginTop:10,
        marginBottom:50,
        fontSize: 50,
        fontWeight: 'bold'
    },
    containerText:{
        fontSize: 35,
        fontWeight: 'normal'
    },
    backButtom:{
        position: 'absolute',
        zIndex: 999,
        elevation: 9,
        top:45,
        left:5
    }
})