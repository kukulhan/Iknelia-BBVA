import { StyleSheet } from 'react-native';
import { ikneliaColors } from '../styles/iknealiaColors';
import { ikneliaFonts } from '../styles/ikneliaFonts';


export const noAssistantTheme = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: ikneliaColors.ikneliaBackground
    },
    row: {
        flexDirection: 'row',
    },
    item: {
        marginTop: 75,
        flex: 1,
        height: 120,
        paddingVertical: 20,
        borderColor: ikneliaColors.ikneliaGralButton,
        backgroundColor: ikneliaColors.ikneliaGralButton,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginHorizontal: 5,
    },
    amountItem: {
        //flex: 1,
        height: 150,
        width: 300,
        paddingVertical: 20,
        borderColor: ikneliaColors.ikneliaGralButton,
        backgroundColor: ikneliaColors.ikneliaGralButton,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginHorizontal: 5,
        marginBottom: 50
    },
    blogItem: {
        width: '31%',
        height: 120,
        paddingVertical: 20,
        borderColor: ikneliaColors.primaryLight,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginHorizontal: 5,
    },
    itemText: {
        color: ikneliaColors.ikneliaText,
        fontFamily: ikneliaColors.primaryLight
    },
    itemImage: {
        height: 60,
    },
    dividerView:
    {
        alignItems: 'center',
    },
    divider: {
        borderColor: ikneliaColors.ikneliaText,
        borderRadius: .1,
        borderWidth: .3,
        width: '100%',
        backgroundColor: ikneliaColors.ikneliaText,
        marginTop: 20,
        marginBottom: 50
    },
    amounts: {
        color: ikneliaColors.ikneliaText,
        fontWeight: 'bold',
        fontFamily: ikneliaFonts.primaryRegular,
        fontSize: 30,
        marginVertical: 3,
        textAlign: 'center'
    },
    textContainer: {
        alignItems: 'center',
    },
    availableText: {
        color: ikneliaColors.ikneliaText,
        fontFamily: ikneliaFonts.primaryRegular,
        fontSize: 30,
        marginVertical: 3,
        textAlign: 'center'
    }
  });