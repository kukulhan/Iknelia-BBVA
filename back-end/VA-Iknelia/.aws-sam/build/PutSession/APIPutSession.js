
let response;
var AWS = require('aws-sdk');
AWS.config.update({
	accessKeyId: 'AKIA2GIP6TCP2HW54WP6',
	secretAccessKey: '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',
	region: 'us-west-2'
});
async function putSS(event) {
	const { body } = event;
	const { user } = JSON.parse(body);
	var lexruntime = new AWS.LexRuntime();
		var paramsSession = {
			botAlias: "ikneliaAlias",
			botName: "botIknelia",
			userId: user,
			sessionAttributes: { 
				Iknealia : "IkneliaSession123456"
			}
		};
		
	return await lexruntime.putSession(paramsSession).promise().then(response => {
			console.log("SESSION " + JSON.stringify(response))
			return response;
		}).catch(e => {
			let error=JSON.parse(JSON.stringify(e));
			error["statusCode"]='500'
			return error;
		});


}


exports.putSession = async (event, context) => {
	try {
		const data = await putSS(event);
		if(data.statusCode==='500'){
			response = { statusCode: 500, body: JSON.stringify(data)};
		}
		else{
			response = { statusCode: 200, body: JSON.stringify(data)};
		}
		return response;
	}	catch (e) {
		console.log(e);
		return response;
	}
}