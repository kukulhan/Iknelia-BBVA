const responseLex = require('./responseLex');
const exeDinamoDB = require('../awsDB/executeDinamoDB');
let mensaje;

module.exports.dialog=  function(intentRequest, callback){
    var sessionAttributes = intentRequest.sessionAttributes;
    var intentName = intentRequest.currentIntent.name;
    var slots = intentRequest.currentIntent.slots;
    //var userId=intentRequest.userId;
    var userId="12345678"


    if (slots.slotAmount !== null && intentRequest.inputTranscript.includes(slots.slotAmount)) {
        return exeDinamoDB.getAmount(userId).then(item=>{
            if(parseInt(item.Item.tddAmount)>=parseInt(slots.slotAmount)){
                mensaje=`Se le hara una trasnferencia a ${slots.slotName} por la cantidad de ${slots.slotAmount}. ¿Deseas continuar?`
                return callback(responseLex.confirmIntent(sessionAttributes,intentRequest.currentIntent.name,slots,mensaje));
            }
            else{
                slots.slotAmount=null;
                mensaje="No cuentas con saldo suficiente, elige otro monto"
                return callback(responseLex.elicitSlot(sessionAttributes, intentName, slots, 'slotAmount',mensaje));
            } 
        })
    }

    if (slots.slotCorrectContact !== null && intentRequest.inputTranscript.includes(slots.slotCorrectContact) && intentRequest.currentIntent.confirmationStatus !== 'Confirmed' ) {
        if(slots.slotCorrectContact==="no"){
            mensaje=`Quedo al pendiente de su siguiente instruccion`
            return callback(responseLex.close(sessionAttributes,'Fulfilled',mensaje) );
        }else{
            mensaje="¿Que cantidad deseas transferir?"; 
            return callback(responseLex.elicitSlot(sessionAttributes, intentName, slots, 'slotAmount',mensaje));
        }
    }

    if (slots.slotChooseName !== null && intentRequest.inputTranscript.includes(slots.slotChooseName)) {
        let arrayOpcion=slots.slotChooseName.split(" "); 
        let opcion= arrayOpcion[arrayOpcion.length-1]-1; 
        return exeDinamoDB.getContacts(userId, slots.slotName).then(item=>{
            if(!item[opcion]){
                mensaje="La opcion "+(opcion+1)+ " es incorrecta, selecciona una opcion valida";
                return callback(responseLex.elicitSlot(sessionAttributes, intentName, slots, 'slotChooseName',mensaje));
            }
            mensaje="Tu contacto "+item[opcion].name+" con terminacion de cuenta "+ item[opcion].cuenta.substring(15,19)+", ¿Es correcto?";
            return callback(responseLex.elicitSlot(sessionAttributes, intentName, slots, 'slotCorrectContact',mensaje));
        })
    }

    if (slots.slotName !== null && intentRequest.inputTranscript.includes(slots.slotName)) {
        return exeDinamoDB.getContacts(userId, slots.slotName).then(item=>{
            if(!item){
                mensaje="Al parecer no tienes el contacto llamado "+slots.slotName+". Por favor, dime el nombre de nuevo";
                slots.slotName=null;
                return callback(responseLex.elicitSlot(sessionAttributes, intentName, slots, 'slotName',mensaje));
             }
            if(item.length==1){
                mensaje="Tu contacto "+item[0].name+" con terminacion de cuenta "+ item[0].cuenta.substring(15,19)+", ¿Es correcto?";
                return callback(responseLex.elicitSlot(sessionAttributes, intentName, slots, 'slotCorrectContact',mensaje));
            }
            if(item.length>1){
                let opciones = '';
                let mensaje = '';
                for(let i=0; i < item.length;i++)
                {
                    opciones +=`, opcion ${i + 1}, terminacion de cuenta ${item[i].cuenta.substring(15,19)}`;
                }
                mensaje=`Tienes ${item.length} contactos, que opcion eliges: ${opciones}`;
                return callback(responseLex.elicitSlot(sessionAttributes, intentName, slots, 'slotChooseName',mensaje));
             }
        });
    }

    if(!slots.slotCorrectAmount && !slots.slotAmount && !slots.slotCorrectContact && !slots.slotChooseName && !slots.slotName ){
        callback(responseLex.delegate(sessionAttributes, slots));
    }
    if (intentRequest.currentIntent.confirmationStatus === 'Confirmed' || intentRequest.currentIntent.confirmationStatus === 'Denied'){
        callback(responseLex.delegate(sessionAttributes, slots));
    } 

}