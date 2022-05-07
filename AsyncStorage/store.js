import AsyncStorage from '@react-native-async-storage/async-storage';

const storeJWT = async (token) => {
    if (!token) throw ("token is empty")
    try {
      await AsyncStorage.setItem('jwt', token)
    } catch (error) {
      console.log(error);
    }
  }

  const getJWT = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt');
      if(token) {
        return token;
      } else {
          return null;
      }
    } catch(error) {
      console.log(error);
      return null;
    }
  }

  const checkJWT = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt');
        return (token ? true : false); //if there is jwt token, return true. else return false
      } catch (error) {
          console.log(error)
          return null;
      }
  }

  const clearJWT = async () => {
    try {
      await AsyncStorage.removeItem('jwt');
    } catch (error) {
      console.log(error);
    }
  }

export {
    storeJWT,
    getJWT,
    checkJWT,
    clearJWT,
}