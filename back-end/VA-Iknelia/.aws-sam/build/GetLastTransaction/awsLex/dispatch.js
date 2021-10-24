const orderTransfer = require('./orderTransfer');
const orderHistory = require('./orderHistory');

module.exports =  function(intentRequest, callback){
    //console.log(`dispatch userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
    const intentName = intentRequest.currentIntent.name;
    if(intentName === 'intentTransferIknelia' ){
        return orderTransfer(intentRequest, callback);
    }
    if(intentName === 'intentHistoryIknelia'){
        return orderHistory(intentRequest, callback);
    }
}