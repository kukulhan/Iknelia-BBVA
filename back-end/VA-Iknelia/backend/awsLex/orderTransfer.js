const coreLex = require('./coreLex')

module.exports = async function(intentRequest, callback){
    
    const source = intentRequest.invocationSource;
    
    if (source === 'DialogCodeHook'){
        console.log("####ENTRA DIALOGCODEHOOK####");
        console.log(JSON.stringify(intentRequest, null, 3));
        coreLex.dialog(intentRequest, callback);
    }
    
}