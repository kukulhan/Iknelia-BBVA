 
let response;
/****AWS*****/ 
let table= require('./AWS/Tables.js'); 
var AWS = require("aws-sdk");
let  awsConf= require("./AWS/Configurations.js");
AWS.config.update(awsConf.credentials);
let docClient = new AWS.DynamoDB.DocumentClient();
 
/****AWS*****/
 

 async function queryItems(event){
    const {body}=event;
    const {phone,password}=JSON.parse(body);
    
    var params = {
         TableName: table.ikneliaClients, 
  
      KeyConditionExpression: "#phone = :phone", 
      ExpressionAttributeNames: {
          "#phone": "phone",
          "#password": "password", 
      },
      ExpressionAttributeValues: {
          ":phone":phone,
          ":password": password,
      },
      FilterExpression: "#password = :password AND #phone = :phone "  
      };

    try {
      const data = await docClient.scan(params).promise()
      return data
    } catch (err) {
      return err
    }
  }
exports.login = async (event, context) => { 
    try {
         response={ statusCode:404, body: JSON.stringify({userStatus:'User does not exist'}),headers:{ClientId:""} }; 
        const data = await queryItems(event); 
        const {Count,Items} =JSON.parse(JSON.stringify(data)); 
        if(Count>0)
        {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
            response.statusCode=200;
            response.body=JSON.stringify({userStatus:'valid'}); 
            response.headers.ClientId=Items[0].clientId;
        }  
        return  response 
      } catch (err) {
        return { error: err }
      }
};
