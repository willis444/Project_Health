import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Layout, Icon } from '@ui-kitten/components';
import { ThemeContext } from '../../theme/theme-context';
import { destroyLoginSession } from '../../store/auth/authSlice';
import { useDispatch } from 'react-redux';
import { Spacer } from '../../../custom_components';
import { toastMessage } from '../../../custom_components';
import { getProfile } from '../../../axios/user';
import { clearJWT } from '../../../AsyncStorage/store';
import { findFood } from '../../../axios/food'

export const HomeScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  const themeContext = React.useContext(ThemeContext);

  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  const navigateProfile = () => {
    navigation.navigate('Profile');
  }

  const navigateLogFood = () => {
    navigation.navigate('LogFood');
  }

  const logout = () => {
    dispatch(destroyLoginSession()); // update the redux state by deleting the login status and token
    clearJWT(); // clear the token stored in async storage
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
    toastMessage('Logged out Successfully');
  }

  const test = async() => {
    const data = await findFood('nasi lemak');
    console.log(data);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button style={{ marginVertical: 4 }} onPress={() => navigateProfile()}>My Profile</Button>
        <Icon
        style={{
          width: 32,
          height: 32,
        }}
        fill='#8F9BB3'
        name='star'
        />
        <Spacer/>
        <Button style={{ marginVertical: 4 }} onPress={navigateDetails}>OPEN DETAILS</Button>
        <Spacer/>
        <Button style={{ marginVertical: 4 }} onPress={themeContext.toggleTheme}>TOGGLE THEME</Button>
        <Spacer/>
        <Button style={{ marginVertical: 4 }} onPress={() => navigateLogFood()}>Log Food</Button>
        <Spacer/>
        <Button style={{ marginVertical: 4 }} onPress={() => logout()}>Logout</Button>
        <Spacer/>
        <Button style={{ marginVertical: 4 }} onPress={() => test()}>test</Button>
      </Layout>
    </SafeAreaView>
  );
};