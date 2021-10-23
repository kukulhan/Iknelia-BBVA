import { StyleSheet } from 'react-native';


export const loginStyles = StyleSheet.create({
    loginContainer:{
        flex:1,
        paddingHorizontal:25,
        justifyContent:'center',
        height:800,
        marginBottom:200, 
    },
    title:{
        color:'white',
        fontSize: 25 ,
        fontWeight:'bold',
        top:-25,
        alignSelf: 'center'
    },
    label:{
        alignSelf: 'center',
        marginBottom:20,
        color: 'white',
        fontSize: 18,
        fontWeight: 'normal'
    },
    inputField:{
        color:'white',
        fontSize:20,
        marginBottom:10
    },
    buttomContainer: {
        alignItems:'center'
    },
    buttomLogin:{
        borderWidth: 2,
        borderColor:'white',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100
    },
    textLogin:{
        fontSize: 18,
        color: 'white'
    }
});