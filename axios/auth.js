import axios from 'axios';
import {API} from '@env';
import { storeJWT } from '../AsyncStorage/store';
import { getJWT } from '../AsyncStorage/store'

axios.defaults.timeout = 1000 * 5; // define timeout, 5 seconds

const baseUrl = API;

var headers = null;

export const generateHeader = async() => {
  if (!headers) {
  const jwt = await getJWT();
  headers = {"Authorization": "Bearer " + jwt};
  } else {
    //do nothing
  }
}

generateHeader();

const test = async () => {
  try {
  const url = `${baseUrl}/user/test`;
  const response = await axios.get(url, {
    headers: headers,
  });
  console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

const login = async (user_id, user_password) => { // login function
  const url = `${baseUrl}/auth/login`; // define api url
  try {
  const response =  // response of the back end
  await axios.post(url, { // post credentials into backend
      "user_id": user_id,
      "user_password": user_password,
    });
  storeJWT(response.data.token); // store jwt token into async storage
  } catch (error) { // error handling
      try {
        if (error.response.headers) {
            console.log(error.response.data);
            return(error.response.data);
          }
      } catch {
        return (error.message);
      }
  }
};

const register = async (user_id, user_password) => { // register function
  const url = `${baseUrl}/auth/register`; // define api url
  try {
    const response = // response of the api call
    await axios.post(url, { // post credentials into the backend
      "user_id": user_id,
      "user_password": user_password
    });
    return response;
  } catch (error) { // error handling
    try {
      if (error.response.headers) {
          console.log(error.response.data);
          return(error.response.data);
        }
    } catch {
      return (error.message);
    }
  }
}

export {
  test,
  login,
  register
};