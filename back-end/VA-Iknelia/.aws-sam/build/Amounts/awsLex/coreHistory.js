const responseLex = require('./responseLex');

module.exports.dialog=  function(intentRequest, callback){
    callback(responseLex.delegate(sessionAttributes, slots));
}


module.exports.confirm =  function(intentRequest, callback){
    var sessionAttributes = intentRequest.sessionAttributes;
    var slots = intentRequest.currentIntent.slots;

    const event = new Date(slots.slotDate);
    const options={year:'numeric',month:'long',day:'numeric'}
    var message_date = event.toLocaleDateString("es-MX",options);

    mensaje=`${slots.slotDate}|Te muestro tu historial desde ${message_date}`
    callback(responseLex.close(sessionAttributes,'Fulfilled',mensaje));

}
