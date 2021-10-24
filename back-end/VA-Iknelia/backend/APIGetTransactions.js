 
let response;
/****AWS*****/ 
let table= require('./AWS/Tables.js'); 
var AWS = require("aws-sdk");
let  awsConf= require("./AWS/Configurations.js");
AWS.config.update(awsConf.credentials);
let docClient = new AWS.DynamoDB.DocumentClient(); 
/****AWS*****/ 
 async function getT(event){
   console.log("debe entrar")
  const {  pathParameters } = event;
  const { clientId,date } = pathParameters; 

  console.getLast
    var params = {
         TableName: table.iknelia_movements, 
         Key: { "clientId":clientId },
          
      }; 

    try {

      const data = await docClient.get(params).promise();

      let dateToFilter = new Date(date);
      var history=[];

      data.Item.movementsTDD.map(function(item) {
        if(new Date(item.dateSamll).getTime()>=dateToFilter.getTime())
        {
          history.push(item); 
        }
      })

      var sorted_ms = history.map(function(item) {
        return new Date(item.dateSamll).getTime()
      }).sort(); 

      let dates=[];

      sorted_ms.map(function(date){
        const current=new Date(date); 
       dates.push(current.toLocaleDateString('es-MX'))
      });

      let uniqueDates=[...new Set(dates)]
      let outData=[]
      let space ="                         "

      uniqueDates.map(function(date_){

        let obj={ 
            fecha:date_,
        }

        let movimientos=[]
        sorted_ms.map(function(date){

          const current=new Date(date); //timestap
          const fst =  current.toLocaleDateString('es-MX');//fecha sin tiempo

          data.Item.movementsTDD.map(function(itemDB) {

            if(new Date(itemDB.dateSamll).getTime()===current.getTime())
            {
 
              if((date_===fst))
              {
                let item={item:""}

                let fullString=itemDB.amount+"*"+itemDB.account.substring(8,13);
                item.item=itemDB.amount+space.substring(0,25-fullString.length) +"*"+itemDB.account.substring(8,13);


                movimientos.push(item)
              }
            }
          })
        })




        obj["movimientos"]=movimientos;

        outData.push(obj);

      })
             return outData;
    } catch (err) { 
      console.log("######ERROR####")
      console.log(err);
      return err
    }
  }

exports.getTransactions = async (event, context) => {  

  const {  pathParameters } = event;
  const { clientId,date } = pathParameters; 

  const lastTransation = await getT(event); 
  response={ statusCode:404, body: JSON.stringify({noMovements:'El usuario no tiene transaciones despues de la fecha '+date}) };  

 
  try { 
        if(lastTransation.length>0)
         response={ 
           statusCode:200, 
           body: JSON.stringify(lastTransation) 
          }
          
        return  response 
      } catch (err) {
        return { error: err }
      }
};
