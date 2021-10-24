import axios from 'axios';

const awsIkneliaAPI= () => axios.create({
    baseURL: 'https://slnlcpkaga.execute-api.us-west-2.amazonaws.com', 
})


export default awsIkneliaAPI;


