const orderTransfer = require('./orderTransfer');

module.exports =  function(intentRequest, callback){
    //console.log(`dispatch userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
    const intentName = intentRequest.currentIntent.name;
    if(intentName === 'intentTransfer' ){
        return orderTransfer(intentRequest, callback);
    }

}