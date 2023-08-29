import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.MOCK_API_URL}}`,
});

export default instance;