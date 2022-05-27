import React, { useEffect } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import styles from './styles';
import { Layout, Input, Text, Toggle, Button } from '@ui-kitten/components';
import { Spacer, LoadingSpinner } from '../../../custom_components';
import { toastMessage } from '../../../custom_components';
import { useDispatch, useSelector } from 'react-redux';
import { destroyLoginSession } from '../../store/auth/authSlice';
import { clearJWT } from '../../../AsyncStorage/store';

export const SettingScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  useEffect(() => { // use-effect is used to make sure all the action is only runned once
    
  }, []);

  const isLoading = useSelector(state => state.app.isLoading.payload);

  const navigateToDashboard = () => {
    navigation.navigate('Home');
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{flex:1}}>
          {/* if is loading== true, show loading screen */}
          {isLoading==true ? <LoadingSpinner/> : null}
        <Layout style={styles.card}>
          <Text style={styles.title}>Setting</Text>
          <Spacer />
          <Button style={{ marginVertical: 4 }} onPress={() => logout()}>Logout</Button>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};