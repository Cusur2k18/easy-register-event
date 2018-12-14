import * as axios from 'axios';
import LocalStore from '../store/LocalStore'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

export default instance
