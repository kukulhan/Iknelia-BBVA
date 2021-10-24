
let response;
var AWS = require('aws-sdk');
AWS.config.update({
	accessKeyId: 'AKIA2GIP6TCP2HW54WP6',
	secretAccessKey: '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',
	region: 'us-west-2'
});
async function deleteSS(event) {
	const { pathParameters } = event;
	const { clientId } = pathParameters; 

	var lexruntime = new AWS.LexRuntime();
	var params = {
		botAlias: "ikneliaAlias",
		botName: "botIknelia",
		userId: clientId
	};
	return await lexruntime.deleteSession(params).promise().then(response => {
			console.log("SESSION " + JSON.stringify(response))
			return response
	}).catch(e => {
		let error=JSON.parse(JSON.stringify(e));
		error["statusCode"]='500'
		return error;
	});
}


exports.deleteSession = async (event, context) => {

	try {
		const data = await deleteSS(event);
		if(data.statusCode==='500'){
			response = { statusCode: 500, body: JSON.stringify(data)};
		}
		else{
			response = { statusCode: 200, body: JSON.stringify(data)};
		}
		return response;
	}
	catch (e) {

		//callback(e);
		console.log(e);
		return response;
	}


}