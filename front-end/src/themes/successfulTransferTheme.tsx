import { StyleSheet } from 'react-native';
import { ikneliaColors } from '../styles/iknealiaColors';
import { ikneliaFonts } from '../styles/ikneliaFonts';
 
export const SuccessfulTransferTheme = StyleSheet.create({
    container: 
    {
        flex: 1,  
        backgroundColor:ikneliaColors.white,
        height:800
    }, 
    micView:
    { 
        marginTop:35,
        alignItems: 'center',
    },
    micImage:
    {
        width: 100,
        height: 100,
        backgroundColor: 'transparent',
    },
    accounts:
    {
        marginTop:80,
        borderColor:ikneliaColors.white, 
        borderWidth:10,
        width:400,  
    },
    accountSender:
    {
        borderColor:ikneliaColors.green, 
        borderWidth:10,
        width:180,  
    },
    accountReciever:
    {
        borderColor:ikneliaColors.yellow, 
        borderWidth:10,
        width:180,  
        left:200, 
        position:'absolute' 
    }, 
    charge: 
    { 
        borderColor:ikneliaColors.ikneliaBackground, 
        borderWidth:10,
        width:400
    }, 
    concept:
    {   
        marginTop:180, 
    }, 
    successfulTransfer: { 
        borderColor:ikneliaColors.ikneliaSuccessful, 
        borderWidth:10,
        width:400,
        backgroundColor:ikneliaColors.ikneliaSuccessful,  
    },
    people: {  
        borderTopColor:'#e9e9e9' ,
        borderTopWidth: 130, 
        borderRightWidth: 230,
        borderRightColor: '#f4f4f4', 
        borderRadius:200, 
        width:290,
        height:130  
    },
    personeOne: 
    {   
        borderRadius:50, 
        width:100,
        height:100,
        backgroundColor:ikneliaColors.black,
        marginTop:250,
        marginLeft:70,
        position:'absolute',
    }, 
    personeTwo: 
    {  
        borderTopColor:'#f7893a' ,
        borderTopWidth: 90,
        borderRightWidth: 100,
        borderRightColor: '#eb722d',
        transform:[{ rotate: '10deg'}],
        borderRadius:200,
        width:100,
        height:100,
        backgroundColor:ikneliaColors.black,
        marginTop:250,
        marginLeft:230,
        position:'absolute',
    },
    peopleMain: 
    { 
        width:400,
        alignItems:'center',
        position:'absolute',
        marginTop:240
    },
    accountTitle:
    {
        marginTop:30,
        color: ikneliaColors.black,
        textAlign:'center',
        fontWeight:'bold',
        fontSize: 25,
    },
    accountInf:
    {
        color: ikneliaColors.black,
        textAlign:'center',
        fontSize: 20,
    },
    conceptInf:
    {
        color: ikneliaColors.black,
        textAlign:'center',
        fontWeight:'bold',
        fontSize: 20,
    },
    personeTwoView:
    {
        width:100,
        height:200,
        marginTop:250,
        marginLeft:230,  
        position:'absolute',
    } ,
    personeTwoText:
    {
        color: ikneliaColors.ikneliaText,
        fontFamily: ikneliaFonts.primaryRegular,
        fontSize: 50,
        marginVertical: 10, 
        textAlign:'center',
        marginBottom:20,
    } ,
    avatar: 
    {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    mainText: 
    { 
        color: ikneliaColors.ikneliaText,
        backgroundColor: ikneliaColors.ikneliaBackground, 
        fontSize: 15,  
        textAlign:'center', 
    },
    mainTextSuccess: 
    { 
        color: ikneliaColors.ikneliaText,
        backgroundColor: ikneliaColors.ikneliaSuccessful, 
        fontSize: 30,  
        textAlign:'center',  
        fontWeight:'bold'
    }, 
    amount: 
    { 
        color: ikneliaColors.ikneliaText,
        backgroundColor: ikneliaColors.ikneliaSuccessful, 
        fontSize: 40,  
        textAlign:'center',
        paddingTop:10 
    },
    textUp: 
    { 
        color: ikneliaColors.ikneliaText,
        backgroundColor: ikneliaColors.ikneliaSuccessful, 
        fontSize: 30,  
        textAlign:'center',
        paddingTop:40
    },
    subText:
    {
        color: ikneliaColors.ikneliaText,
        fontFamily: ikneliaFonts.primaryRegular,
        fontSize: 18,
        marginVertical: 10, 
        textAlign:'center',
    },
    backButtom:{
        position: 'absolute',
        zIndex: 999,
        elevation: 9,
        top:45,
        left:5
    }
});