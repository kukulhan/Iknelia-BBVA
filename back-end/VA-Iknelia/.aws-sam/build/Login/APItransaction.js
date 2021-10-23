 
let response;
/****AWS*****/ 
let table= require('./AWS/Tables.js'); 
var AWS = require("aws-sdk");
let  awsConf= require("./AWS/Configurations.js");
AWS.config.update(awsConf.credentials);
let docClient = new AWS.DynamoDB.DocumentClient(); 
/****AWS*****/ 

function randomString(len) {
  var p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return [...Array(len)].reduce(a=>a+p[~~(Math.random()*p.length)],'');
}

async function transaction(event){
  const { body, pathParameters } = event;
  const { clientId } = pathParameters; 
  let jsonBody=JSON.parse(body);
  jsonBody["transactionId"]=randomString(20);
  const options={year:'numeric',month:'long',day:'numeric',hour:'numeric',minute:'numeric',second:'numeric' }
  const date=new Date();
  
  jsonBody["date"]=date.toLocaleDateString("es-MX",options);
  jsonBody["dateSamll"]=date.toLocaleDateString("es-MX");

  let accountType = body.jsonBody==="tdc"?"movementsTDC":"movementsTDD";
    var params = {
         TableName: table.iknelia_movements, 
         Key: { "clientId":clientId },
         ReturnValues: 'ALL_NEW',
         UpdateExpression: 'set #accountType = list_append(if_not_exists(#accountType, :empty_list), :transaction)',
         ExpressionAttributeNames: {
           '#accountType': accountType
         },
         ExpressionAttributeValues: {
           ':transaction': [jsonBody],
           ':empty_list': []
         }
      }; 
    try {
      const data = await docClient.update(params).promise();
      return data;
    } catch (err) { 
      console.log(err);
      return err
    }
  }



  
exports.transaction = async (event, context) => {  

  const contacts = await transaction(event);

  response={ statusCode:404, body: JSON.stringify({contactStatus:'No existe el contacto solicitado.'}) };  
  try { 
        if(contacts!=null)
         response={ 
           statusCode:200, 
           body: JSON.stringify(contacts) 
          };  
        return  response 
      } catch (err) {
        return { error: err }
      }
};
