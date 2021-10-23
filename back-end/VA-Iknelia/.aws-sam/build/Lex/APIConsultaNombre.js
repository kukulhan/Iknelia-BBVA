
let response; 

  
var AWS = require('aws-sdk');
 
AWS.config.update({
   accessKeyId: 'AKIA2GIP6TCP2HW54WP6',
   secretAccessKey: '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',
   region: 'us-west-2' 
});
 


async function lex(event)
{
   const { body } = event;
   const {mensaje,user}=JSON.parse(body);

	//	************************
				//	Message is valid so now we prepare to pass it along to the Lex API.
				//	************************
				//AWS.config.region = 'us-west-2';
				var lexruntime = new AWS.LexRuntime();
				//var userNumber = twilioSMS.From.replace('+', '');
				var params = {
				  botAlias:  "pruebaIknelia",
				  botName: "OrderFlowers_esLATAM",
				  inputText: mensaje,
				  userId: user,
				  sessionAttributes: {
				  }
				};

		return await lexruntime.postText(params, function(err, data) {
					//var twimlResponse = new twilio.TwimlResponse();
				if (err) {
					console.log("##################");
					console.log("#######ERROR#######");    
					console.log(err, err.stack);
               		return err;
				//		console.log(err, err.stack); // an error occurred
			    //  twimlResponse.message('Sorry, we ran into a problem at our end.');
			     // callback(err, "HOLA");
				} else {
 
                  	console.log("##################");  
                 // response.body=JSON.stringify(data);
                //  response.statusCode=200;
                  	console.log(JSON.stringify(data));           // got something back from Amazon Lex
                  	console.log("##################"); 
                  	return data;
		           // callback(null, JSON.stringify(data));
					}
				}).promise();

 //  return {status:'no pinches jalo'};
}

  
exports.consultaNombre = async(event, context) => { 
 
try{

   const data= await lex(event);


   response={ statusCode:200, body: JSON.stringify(data)}; 
 			


 
 return response;
 
}
catch(e)
{
   callback(e);
 
  return response;
}


//return response={ statusCode:404, body: JSON.stringify({userStatus:'User does not exist'}),headers:{ClientId:""} }; 



}