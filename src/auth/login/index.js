import React, { useState } from 'react';
import { SafeAreaView, Platform, View, TouchableWithoutFeedback, Pressable } from 'react-native';
import styles from './styles';
import { Button, Divider, Layout, TopNavigation, Input, Text, Icon } from '@ui-kitten/components';
import { Spacer, LoadingSpinner } from '../../../custom_components';
import { login } from '../../../axios/auth';
import { toastMessage } from '../../../custom_components';
import { setisLoading } from '../../store/app/appSlice'
import { setLoginStatus } from '../../store/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getJWT } from '../../../AsyncStorage/store';

export const LoginScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.app.isLoading.payload);

  async function loginButton() { // login function
    if (valueID == "" || valuePassword == "") {
      return toastMessage("Please fill in all the required fields");
    }
    dispatch(setisLoading(true));
    var response = await login(valueID, valuePassword); // call the login function from axios
    if (!response) { // if the response is null
      const token = await getJWT();
      dispatch(setLoginStatus(true)); // update redux state
      toastMessage('Login successfully'); // display successful message to user
      dispatch(setisLoading(false));
    } else { // if there is any error message returned, display it
    toastMessage(response);
    dispatch(setisLoading(false));
    }
  }

  const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline'/>
  );

  // state for text input
  const [valueID, setValueID] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  // function for toogle password view
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  // render the icon and provide the logic of toggle password view
  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );

  // render the sub text under the password field
  const renderCaption = () => {
    return (
      <View style={styles.captionContainer}>
        {AlertIcon(styles.captionIcon)}
        <Text style={styles.captionText}>Should contain at least 8 characters</Text>
      </View>
    )
  }

  const navigateToRegister = () => {
    navigation.navigate('Register');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={styles.card}>
        {/* if is loading== true, show loading screen */}
      {isLoading==true ? <LoadingSpinner/> : null}
        <Text style={styles.title}>Login</Text>
        <Spacer />
        <Input
          label='User ID'
          placeholder='Enter your ID'
          value={valueID}
          onChangeText={nextValue => setValueID(nextValue)}
        />
        <Spacer height={32}/>
        <Input
          value={valuePassword}
          label='Password'
          placeholder='Enter your password'
          caption={renderCaption}
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={nextValue => setValuePassword(nextValue)}
           />
        <Spacer height={20}/>
        <Button onPress={() => loginButton()}>LOGIN</Button>
        <Spacer/>
        <Spacer/>
        <Text style={styles.subTitle}>Don't have an account?</Text>
        <Pressable
         onPress={() => {
          navigateToRegister();
        }}>
        <Text style={styles.registerButton}>Register now</Text>
        </Pressable>
      </Layout>
    </SafeAreaView>
  );
};