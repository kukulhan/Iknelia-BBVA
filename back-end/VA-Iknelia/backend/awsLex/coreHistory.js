const responseLex = require('./responseLex');

module.exports.dialog=  function(intentRequest, callback){
    callback(responseLex.delegate(sessionAttributes, slots));
}
