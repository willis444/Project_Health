import React, { useState } from 'react';
import { SafeAreaView, Platform, View, TouchableWithoutFeedback, Pressable } from 'react-native';
import styles from './styles';
import { Button, Divider, Layout, TopNavigation, Input, Text, Icon } from '@ui-kitten/components';
import { Spacer } from '../../../custom_components';
import { login } from '../../../axios/auth';
import { toastMessage } from '../../../custom_components';
import { setLoginSession } from '../../store/auth/authSlice';
import { useDispatch } from 'react-redux';
import { getJWT } from '../../../AsyncStorage/store';

export const LoginScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  async function loginButton() { // login function
    var response = await login(valueID, valuePassword); // call the login function from axios
    if (!response) { // if the response is null
      const token = await getJWT();
      //dispatch(setLoginSession(token)); // update redux state
      navigation.reset({ // navigate to home screen and reset the stack to prevent user from going back to login screen
        index: 0,
        routes: [{ name: 'Home' }],
      });
      toastMessage('Login successfully'); // display successful message to user 
    } else { // if there is any error message returned, display it
    toastMessage(response);
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
      {/* if it is ios system, show the top navigation bar */} 
      <Divider/>
      <Layout style={styles.card}>
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