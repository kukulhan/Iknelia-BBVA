import axios from 'axios';

const awsLexIkneliaAPI= () => axios.create({
    baseURL: 'https://slnlcpkaga.execute-api.us-west-2.amazonaws.com',
    headers:{'Content-Type':'application/json'}
  
})

export default awsLexIkneliaAPI;
