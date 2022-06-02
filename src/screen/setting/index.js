import React, { useEffect } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import styles from './styles';
import { Layout, Input, Text, Toggle, Button } from '@ui-kitten/components';
import { Spacer, LoadingSpinner } from '../../../custom_components';
import { toastMessage } from '../../../custom_components';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginStatus } from '../../store/auth/authSlice';
import { setUserLanguage, retrieveUserProfile, setisLoading } from '../../store/app/appSlice';
import { updateLanguage } from '../../../axios/user';
import { clearJWT } from '../../../AsyncStorage/store';

export const SettingScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.app.isLoading.payload);

  const language = useSelector(state => state.app.user_language);

  var count = 0;

  const navigateToDashboard = () => {
    navigation.navigate('Home');
  }

  const logout = () => {
    clearJWT(); // clear the token stored in async storage
    dispatch(setLoginStatus(false));
    toastMessage('Logged out Successfully');
  }

  // use effect hook to make sure the function only runs once when the data change
  useEffect(async() => {
    dispatch(setisLoading(true));
    const data = { // define data body
      user_language: language,
    }
    const result = await updateLanguage(data);
    dispatch(retrieveUserProfile());
  }, [language]);

  const onCheckedLanguage = async() => {
    if (language=="en") {
      dispatch(setUserLanguage("ms"));
    } else {
      dispatch(setUserLanguage("en"));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{flex:1}}>
          {/* if is loading== true, show loading screen */}
          {isLoading==true ? <LoadingSpinner/> : null}
        <Layout style={styles.card}>
          <Text style={styles.title}>Setting</Text>
          <Spacer />
          <Spacer height={20}/>
          <Text style={styles.content}>{language=='en'?"English":"Malay"}</Text>
          <Spacer/>
          <Toggle style={styles.toggle}
                  status= {language=='en'?'warning':'warning'}
                  checked={language=='en'?true:false} 
                  onChange={onCheckedLanguage}>
          </Toggle>
          <Spacer/>
          <Button style={{ marginVertical: 4 }} onPress={() => logout()}>Logout</Button>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};