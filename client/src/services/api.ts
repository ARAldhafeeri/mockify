import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://server:5000', // This will work within Docker network due to service name
});

export default instance;
