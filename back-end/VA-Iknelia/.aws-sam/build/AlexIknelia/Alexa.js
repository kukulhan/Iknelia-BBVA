
const dispatch = require('./awsLex/dispatch');

exports.alexa =  (event, context, callback) => { 
  try {
      console.log(`event bot=${event.bot.name}`);
      dispatch(event, (response) => callback(null, response));
  } catch (err) {
      console.log(err);
      callback(err);
  }
};
