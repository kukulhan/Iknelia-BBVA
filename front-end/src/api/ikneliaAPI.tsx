import axios from 'axios';

const awsIkneliaAPI= () => axios.create({
    baseURL: 'https://8fcz26f8u6.execute-api.us-west-2.amazonaws.com', 
})


export default awsIkneliaAPI;


