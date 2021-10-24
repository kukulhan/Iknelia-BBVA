 
let response;
/****AWS*****/ 
let table= require('./AWS/Tables.js'); 
var AWS = require("aws-sdk");
let  awsConf= require("./AWS/Configurations.js");
AWS.config.update(awsConf.credentials);
let docClient = new AWS.DynamoDB.DocumentClient(); 
/****AWS*****/ 
 async function validateContact(event){
  const {  pathParameters } = event;
  const { clientId,contactName } = pathParameters; 
    var params = {
         TableName: table.iknelia_contacts, 
         Key: { "clientId":clientId } 
      }; 
    try {
      const data = await docClient.get(params).promise() 
      let allContacts = data.Item.contacts;
      let contact;
      const totalContacts=(allContacts,contactName)=>allContacts.reduce((a,v)=>(v.name===contactName?a+1:a),0);
      //if there are more than one, i will send them all that match 
      //but if not, i will filter just the contact information i want
      contact=allContacts.find(contact=>contact.name==contactName);
      if(totalContacts(allContacts,contactName)==0)
        return null; //the client doesnt have a contact 
      if(totalContacts(allContacts,contactName)==1&& contact!=null)
        return [contact];
      return allContacts
    } catch (err) { 
      console.log(err);
      return err
    }
  }
exports.validateContact = async (event, context) => {  
  const contacts = await validateContact(event);
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
