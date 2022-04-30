import axios from 'axios';
import {api, local} from '@env';
import { storeJWT } from '../AsyncStorage/store';

const baseUrl = local;

const test = async () => {
  const url = `${baseUrl}/user/test1`;
  const response = await axios.get(url);
  console.log(response.data);
};

const login = async (id, password) => { // login function
  const url = `${baseUrl}/auth/login`; // define api url
  try {
  const response =  // response of the back end
  await axios.post(url, { // post credentials into backend
      "id": id,
      "password": password,
    });
  storeJWT(response.data.token); // store jwt token into async storage
  } catch (error) {
      console.log(error.response.data);
      return(error.response.data);
  }
};

export {
  test,
  login
};