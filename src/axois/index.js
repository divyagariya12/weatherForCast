import axios from 'axios';
import * as constants from '../constants';

// Axios Instance for register & login
export let auth = axios.create({
  baseURL: constants.BaseURL,
  headers: {
    Accept: 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  timeout: 10000,
  responseType: 'json',
});
