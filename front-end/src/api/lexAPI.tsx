import axios from 'axios';

const awsLexAPI= () => axios.create({
    baseURL: 'https://8fcz26f8u6.execute-api.us-west-2.amazonaws.com',
    headers:{'Content-Type':'application/json'}
})


export default awsLexAPI;

