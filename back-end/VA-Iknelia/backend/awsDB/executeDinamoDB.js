
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



///////////////////////////////////////////////////
/////////////////////////////////////////////////////

module.exports.postTransaction=async function(clientId,transferAmount)
{
  const options={year:'numeric',month:'long',day:'numeric',hour:'numeric',minute:'numeric',second:'numeric' }
  const date=new Date();
  

  let jsonBody=
  {
      amount:transferAmount,
      concept:"Transferencia",
      accountType:"tdd",

  }
  jsonBody["date"]=date.toLocaleDateString("es-MX",options);
  jsonBody["dateSamll"]=date.toLocaleDateString("es-MX");
  jsonBody["transactionId"]=randomString(20);
  let accountType = jsonBody.accountType==="tdc"?"movementsTDC":"movementsTDD";
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

      const updateAsync= promisify(docClient.update,docClient);

      return updateAsync(params).then(response=>{return response});
 
    } catch (err) { 
      console.log(err);
      return err
    }
}

module.exports.postTransactionAmout=async function(clientId,transferAmount,currentAmount,account,contact)
{

  console.log("SE MODIFICA LA FECHA********###")
  const options={year:'numeric',month:'long',day:'numeric',hour:'numeric',minute:'numeric',second:'numeric',timeZone:'America/Mexico_City'}
  const date=new Date();
  console.log("SE MODIFICA LA FECHA********###")
  console.log("SE MODIFICA LA FECHA********###")
  console.log("SE MODIFICA LA FECHA********###")
  console.log("SE MODIFICA LA FECHA********###")
  let jsonBody=
  {
      amount:transferAmount,
      concept:"Transferencia",
      accountType:"tdd",
      account:account,
      contact:contact
  }
  jsonBody["transactionId"]=randomString(20);
  jsonBody["date"]=date.toLocaleDateString("es-MX",options);
  jsonBody["dateSamll"]=date.toLocaleString('en-US',{timeZone:'America/Mexico_City'})

  let accountType = jsonBody.accountType==="tdc"?"movementsTDC":"movementsTDD";
    var params_ = {
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
  let tddAmount=parseInt(currentAmount)-parseInt(transferAmount);
    var params = {
         TableName: table.iknelia_amounts, 
         Key: { "clientId":clientId }, 
         UpdateExpression: 'SET #tddAmount=:transaction',
         ExpressionAttributeNames: {
           '#tddAmount': "tddAmount"
         },
         ExpressionAttributeValues: {
           ':transaction':tddAmount
         }
      }; 
    try {
      const updateAsync= promisify(docClient.update,docClient);
      updateAsync(params_).then(response=>{return response});
      return updateAsync(params).then(response=>{return response});
    } catch (err) { 
      console.log(err);
      return err
    }
}


function randomString(len) {
  var p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return [...Array(len)].reduce(a=>a+p[~~(Math.random()*p.length)],'');
}





