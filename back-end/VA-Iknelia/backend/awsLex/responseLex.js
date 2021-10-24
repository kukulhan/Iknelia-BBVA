module.exports.delegate =  function(sessionAttributes, slots) {
  return {
      sessionAttributes,
      dialogAction:{
          type:'Delegate',
          slots
      }
  }
}

module.exports.elicitSlot =  function(sessionAttributes, intentName, slots, slotToElicit,messageContent) {
return {
  sessionAttributes,
  dialogAction: {
    type: 'ElicitSlot',
    intentName,
    slots,
    slotToElicit,
    message:{ contentType: 'PlainText', content: messageContent }
  }
};
};


