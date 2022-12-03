import axios from 'axios';

//set the url for the entire application
const BASE_URL = 'https://bcca.onrender.com/';

export default axios.create({
  baseURL: BASE_URL,
});
