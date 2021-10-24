
let table= require('../AWS/Tables'); 
var AWS = require("aws-sdk");
let awsConf= require("../AWS/Configurations");
AWS.config.update(awsConf.credentials);
let docClient = new AWS.DynamoDB.DocumentClient(); 
const promisify=require("../node_modules/es6-promisify");

module.exports.getContacts = async function(clientId, contactName) {
    var params = {
        TableName: table.iknelia_contacts, 
        Key: { "clientId":clientId } 
    }; 
    const getAsync= promisify(docClient.get,docClient);
    return getAsync(params).then(response=>{
        let allContacts = response.Item.contacts;
        let contact;
        const totalContacts=(allContacts,contactName)=>allContacts.reduce((a,v)=>(v.name===contactName?a+1:a),0);
        //if there are more than one, i will send them all that match 
        //but if not, i will filter just the contact information i want
        contact=allContacts.filter(contact=>contact.name==contactName);
        if(totalContacts(allContacts,contactName)==0)
          return null; //the client doesnt have a contact 
        return contact
    })
  };

module.exports.getAmount=async function(clientId)
{
      var params = {
           TableName: table.iknelia_amounts, 
           Key: { "clientId":clientId } 
        }; 
      try {
        const getAsync= promisify(docClient.get,docClient);
        return getAsync(params).then(response=>{return response});
      } catch (err) { 
        console.log(err);
        return err
      }
}



