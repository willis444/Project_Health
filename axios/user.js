import axios from 'axios';
import { API } from '@env';
import { getJWT } from '../AsyncStorage/store'
import qs from 'qs';

axios.defaults.timeout = 1000 * 5; // define timeout, 5 seconds

const baseUrl = API; //define api end point

var headers = null;

const generateHeader = async() => {
  const jwt = await getJWT();
  headers = {"Authorization": "Bearer " + jwt, "content-type": "application/x-www-form-urlencoded"};
}

generateHeader();

const getProfile = async () => {
  await generateHeader();
  const url = `${baseUrl}/user/getProfile`; // define api url
  try {
  const response =  // response of the back end
  await axios.get(url, { // send a get request
      "headers": headers, // define header 
  });
  return response.data;
  } catch (error) { // error handling
      try {
        if (error.response.headers) { // if there is header from error message, means it is returned by the api
            console.log(error.response.data);
            return(error.response.data);
          }
      } catch (error) { // else display error from axios
        console.log(error);
        return (error.message);
      }
  }
};

const updateProfile = async (data) => {
  await generateHeader();
  const url = `${baseUrl}/user/updateProfile`; // define api url
  try {
  await axios.post(url, // make a post request using the url defined above, then append the data into the request
    qs.stringify(data), // stringify the content so it can be passed to the backend
    {headers: headers} // define the header of the request
  );
  return "Update successful"; // return the response of the api call
  } catch (error) { // error handling
      try {
        if (error.response.headers) { // if there is header from error message, means it is returned by the api
            console.log(error.response.data);
            return(error.response.data);
          }
      } catch (error) { // else display error from axios
        console.log(error);
        return (error.message);
      }
  }
};

const updateLanguage = async (data) => {
  await generateHeader();
  const url = `${baseUrl}/user/updateLanguage`; // define api url
  try {
    await axios.post(url, // make a post request using the url defined above, then append the data into the request
      qs.stringify(data), // stringify the content so it can be passed to the backend
      {headers: headers} // define the header of the request
    );
    return "Update successful"; // return the response of the api call
    } catch (error) { // error handling
        try {
          if (error.response.headers) { // if there is header from error message, means it is returned by the api
              console.log(error.response.data);
              return(error.response.data);
            }
        } catch (error) { // else display error from axios
          console.log(error);
          return (error.message);
        }
    }
}

export {
  getProfile,
  updateProfile,
  updateLanguage
};