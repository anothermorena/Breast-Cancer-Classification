import axios from 'axios';

//set the url for the entire application
const BASE_URL = 'https://breastcca.herokuapp.com/';

export default axios.create({
    baseURL: BASE_URL
});