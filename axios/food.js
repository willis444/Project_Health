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

const addNewFoodRecord = async (datetime, meal_type, food_id, serving_size) => {
  const url = `${baseUrl}/food/LogFood`; // define api url
  const content = {"datetime": datetime, "meal_type": meal_type, "food_id": food_id, "serving_size": serving_size} // define the data that will be sent via the api
  try {
    const response = await axios.post(url, // make a post request using the url defined above, then append the data into the request
      qs.stringify(content), // stringify the content so it can be passed to the backend
      {headers: headers} // define the header of the request
    );
    return "Update successful"; // return the response of the api call
    } catch (error) { // error handling
        try {
          if (error.response.headers) { // if there is header from error message, means it is returned by the api
              console.log(error.response.data);
              return(error.response.data);
            }
        } catch { // else display error from axios
          return ("Opps, seemslike the server is down, please try again later.");
        }
    }
}

  export {
    findFood,
    addNewFoodRecord,
  }