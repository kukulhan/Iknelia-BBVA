const responseLex = require('./responseLex');
const exeDinamoDB = require('../awsDB/executeDinamoDB');
let mensaje;

module.exports.dialog=  function(intentRequest, callback){
    var sessionAttributes = intentRequest.sessionAttributes;
    var intentName = intentRequest.currentIntent.name;
    var slots = intentRequest.currentIntent.slots;
    //var userId=intentRequest.userId;
    var userId="12345678"

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

}