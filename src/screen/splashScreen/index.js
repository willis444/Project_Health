import React from 'react';
import { SafeAreaView } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, Button } from '@ui-kitten/components';
import { Spacer } from '../../../custom_components';
import { useDispatch } from 'react-redux';
import { retrieveUserProfile, setisLoading } from '../../store/app/appSlice';
import { checkJWT } from '../../../AsyncStorage/store';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  //const isLogin = checkJWT();

  async function checkLogin() {
    const isLogin = await checkJWT(); // get login status from async storage
    if (isLogin === true) { // if the result is true
      //dispatch(setisLoading(true));
      dispatch(retrieveUserProfile());
      navigation.reset({ // navigate user to homescreen and reset the route
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } else if (isLogin === false) { // if the result is false
      navigation.reset({ // navigate user to homescreen and reset the route
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } else {
      console.log('error!');
    }
  }

  checkLogin();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spacer/>
      <Text style={{fontSize: 80}}>Splash Screen!</Text>
      </Layout>

    </SafeAreaView>
  );
};