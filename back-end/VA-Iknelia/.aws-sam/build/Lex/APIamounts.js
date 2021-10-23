 
let response;
/****AWS*****/ 
let table= require('./AWS/Tables.js'); 
var AWS = require("aws-sdk");
let  awsConf= require("./AWS/Configurations.js");
AWS.config.update(awsConf.credentials);
let docClient = new AWS.DynamoDB.DocumentClient(); 
/****AWS*****/ 
 async function getAmouts(event){
  const {  pathParameters } = event;
  const { clientId } = pathParameters; 
    var params = {
         TableName: table.iknelia_amounts, 
         Key: { "clientId":clientId } 
      }; 
    try {
      const data = await docClient.get(params).promise() 
      return data
    } catch (err) { 
      console.log(err);
      return err
    }
  }
exports.amounts = async (event, context) => {  
  const amounts = await getAmouts(event); 
  response={ statusCode:404, body: JSON.stringify({userStatus:'User does not exist'}) };  
  try { 
        if(amounts.Item!=null)
         response={ 
           statusCode:200, 
           body: JSON.stringify(amounts.Item) 
          };  
        return  response 
      } catch (err) {
        return { error: err }
      }
};
