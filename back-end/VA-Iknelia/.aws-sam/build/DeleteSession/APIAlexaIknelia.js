let response;
var AWS = require('aws-sdk');
AWS.config.update({
	accessKeyId: 'AKIA2GIP6TCP2HW54WP6',
	secretAccessKey: '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',
	region: 'us-west-2'
});
async function lex(event) {
	const { body } = event;

	console.log("###############")
	console.log(JSON.parse(body))
	console.log("###############")
	const { mensaje, user } = JSON.parse(body);

	const mensajeSA= mensaje.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()
	console.log("######>>>>>>>>> "+mensajeSA)


	var lexruntime = new AWS.LexRuntime();
	var params = {
		botAlias: "iknelia",
		botName: "botTransfer",
		inputText: mensajeSA,
		userId: user,
		sessionAttributes: { 
			Iknealia : "IkneliaSession123456"
		}
	};




		return await lexruntime.postText(params).promise().then(response => {
			console.log("Response");
			console.log(response);
			return response;
		}).catch(e => {
			console.log("############");
			console.log(e);
		}); 
}


exports.alexaIknelia = async (event, context) => {

	try {

		const data = await lex(event);


		response = { statusCode: 200, body: JSON.stringify({ message: data.message }) };




		return response;

	}
	catch (e) {

		//callback(e);
		console.log(e);
		return response;
	}


}