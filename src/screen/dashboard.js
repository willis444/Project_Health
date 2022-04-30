import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Layout } from '@ui-kitten/components';
import { ThemeContext } from '../theme/theme-context';
import { destroyLoginSession } from '../store/auth/authSlice';
import { useDispatch } from 'react-redux';
import { Spacer } from '../../custom_components';

export const HomeScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  const themeContext = React.useContext(ThemeContext);

  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  const logout = () => {
    dispatch(destroyLoginSession()); // update the redux state by deleting the login status and token
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button style={{ marginVertical: 4 }} onPress={navigateDetails}>OPEN DETAILS</Button>
        <Spacer/>
        <Button style={{ marginVertical: 4 }} onPress={themeContext.toggleTheme}>TOGGLE THEME</Button>
        <Spacer/>
        <Button style={{ marginVertical: 4 }} onPress={logout}>Logout</Button>
      </Layout>
    </SafeAreaView>
  );
};