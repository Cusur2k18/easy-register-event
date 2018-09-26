import * as axios from 'axios';
import LocalStore from '../store/LocalStore'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000
});

if (LocalStore.getToken()) {
  instance.defaults.headers.common['Authorization'] = LocalStore.getToken();
}

export default instance
