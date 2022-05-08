import axios from 'axios';
import {api, local} from '@env';
import { storeJWT } from '../AsyncStorage/store';
import { setisLoading } from '../src/store/app/appSlice';
import { useDispatch } from 'react-redux';

axios.defaults.timeout = 1000 * 5; // define timeout

const baseUrl = local;

const headers = {"Authorization": "Bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNpYmFpIiwiaWF0IjoxNjUxMzg4NTM4LCJleHAiOjE2NTE5OTMzMzh9.DS1CGrOAmmgidLhdwqjHak9QIRrS1PZRihMKfLefplA'};

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