import axios from 'axios';
import { API } from '@env';
import { getJWT } from '../AsyncStorage/store'
import qs from 'qs';

axios.defaults.timeout = 1000 * 5; // define timeout, 5 seconds

const baseUrl = API; //define api end point

var headers = null;

const generateHeader = async() => {
  if (!headers) {
  const jwt = await getJWT();
  headers = {"Authorization": "Bearer " + jwt, "content-type": "application/x-www-form-urlencoded"};
  } else {
    //do nothing
  }
}

generateHeader();

const findFood = async (keywords) => { // login function
    const data = {"food_name": keywords}; // prepare the data query
    const url = `${baseUrl}/food/findFood`; // define api url
    try {
    const response =  // response of the back end
    await axios.post(url, // make a get request using the url defined above, then append the data into the request
      qs.stringify(data), // stringify the content so it can be passed to the backend
      {headers: headers} // define the header of the request
    );
    console.log(response.data);
    return response.data;
    } catch (error) { // error handling
        try {
          if (error.response.headers) { // if there is header from error message, means it is returned by the api
              console.log(error.response.data);
              return(error.response.data);
            }
        } catch { // else display error from axios
          return (error.message);
        }
    }
  };

  export {
    findFood,
  }