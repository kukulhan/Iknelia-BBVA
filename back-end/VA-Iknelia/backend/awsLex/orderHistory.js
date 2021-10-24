const coreHistory = require('./coreHistory')

module.exports = async function(intentRequest, callback){
    
    const source = intentRequest.invocationSource;
    
    if (source === 'DialogCodeHook'){
        console.log("####ENTRA DIALOGCODEHOOK HISTORY####");
        console.log(JSON.stringify(intentRequest, null, 3));
        coreHistory.dialog(intentRequest, callback);
    }

    
    if (source === 'FulfillmentCodeHook') {
        console.log("####ENTRA FULFILLMENTCODEHOOK HISTORY####");
        console.log(JSON.stringify(intentRequest, null, 3));
        coreHistory.confirm(intentRequest,callback);
      }
    
}