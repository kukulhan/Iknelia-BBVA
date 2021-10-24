 
let response;
/****AWS*****/ 
let table= require('./AWS/Tables.js'); 
var AWS = require("aws-sdk");
let  awsConf= require("./AWS/Configurations.js");
AWS.config.update(awsConf.credentials);
let docClient = new AWS.DynamoDB.DocumentClient(); 
/****AWS*****/ 
 async function getLT(event){
   console.log("debe entrar")
  const {  pathParameters } = event;
  const { clientId } = pathParameters; 
    var params = {
         TableName: table.iknelia_movements, 
         Key: { "clientId":clientId } 
      }; 

 
    try {
      const data = await docClient.get(params).promise();

        console.log(JSON.stringify(data))
        // convert to timestamp and sort
        var sorted_ms = data.Item.movementsTDD.map(function(item) {
          return new Date(item.dateSamll).getTime()
        }).sort(); 
        // take latest
        var latest_ms = sorted_ms[sorted_ms.length-1];

     
        let response;
        data.Item.movementsTDD.map(function(item) {

          if(new Date(item.dateSamll).getTime()===latest_ms)
          {
              response= item;
          }
        })

     return response;
    } catch (err) { 
      console.log(err);
      return err
    }
  }
exports.getLastTransaction = async (event, context) => {  

  const lastTransation = await getLT(event);

  response={ statusCode:404, body: JSON.stringify({userStatus:'User does not exist'}) };  

 
  try { 
        if(lastTransation!=null)
         response={ 
           statusCode:200, 
           body: JSON.stringify(lastTransation) 
          };  
        return  response 
      } catch (err) {
        return { error: err }
      }
};
