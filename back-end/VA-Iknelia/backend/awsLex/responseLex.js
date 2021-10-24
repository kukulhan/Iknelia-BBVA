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


module.exports.close =  function(sessionAttributes, fulfillmentState, messagecontentContent) {
  return {
    sessionAttributes,
    dialogAction: {
      type: 'Close',
      fulfillmentState,
      message:{ contentType: 'PlainText', content: messagecontentContent }
    }
  };
  };
  
  
  module.exports.confirmIntent =  function(sessionAttributes, intentName, slots, messagecontentContent) {
  return {
    sessionAttributes,
    dialogAction: {
      type: 'ConfirmIntent',
      intentName,
      slots,
      message:{ contentType: 'PlainText', content: messagecontentContent }
    }
  };
  };


