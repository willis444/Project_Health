import React, { useState } from 'react';
import { SafeAreaView, Platform, View, TouchableWithoutFeedback, Pressable } from 'react-native';
import styles from './styles';
import { Button, Divider, Layout, TopNavigation, Input, Text, Icon } from '@ui-kitten/components';
import { Spacer } from '../../../custom_components';
import { register } from '../../../axios/auth';
import { toastMessage } from '../../../custom_components';
import { setLoginSession } from '../../store/auth/authSlice';
import { useDispatch } from 'react-redux';
import { getJWT } from '../../../AsyncStorage/store';

export const RegisterScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  async function registerButton() { // login function
    if (valueID == '' || valuePassword == '' || valueConfirmPassword == '') {
      return toastMessage('Please fill in all the required field');
    } else if (valuePassword != valueConfirmPassword) {
      return toastMessage(`Password and confirm password doesn't match`);
    } else {
      var response = await register(valueID, valuePassword); // call the login function from axios
      if (response.status === 200) { // if the response is null
        navigation.reset({ // navigate to home screen and reset the stack to prevent user from going back to login screen
          index: 0,
          routes: [{ name: 'Login' }],
        });
        toastMessage('Successfully Register'); // display successful message to user 
      } else { // if there is any error message returned, display it
      toastMessage(response);
      }
    }
  }

  const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline'/>
  );

  // state for text input
  const [valueID, setValueID] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const [valueConfirmPassword, setValueConfirmPassword] = useState('');
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
  const renderCaptionPassword = () => {
    return (
      <View style={styles.captionContainer}>
        {AlertIcon(styles.captionIcon)}
        <Text style={styles.captionText}>Should contain at least 8 characters</Text>
      </View>
    )
  }

  const renderCaptionConfirmPassword = () => {
    return (
      <View style={styles.captionContainer}>
        {AlertIcon(styles.captionIcon)}
        <Text style={styles.captionText}>Should match with the password above</Text>
      </View>
    )
  }

  const navigateToLogin = () => {
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* if it is ios system, show the top navigation bar */} 
      <Divider/>
      <Layout style={styles.card}>
        <Text style={styles.title}>Register</Text>
        <Spacer />
        <Input
          label='User ID'
          placeholder='Enter your ID'
          value={valueID}
          onChangeText={nextValue => setValueID(nextValue)}
        />
        <Spacer height={20}/>
        <Input
          value={valuePassword}
          label='Password'
          placeholder='Enter your password'
          caption={renderCaptionPassword}
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={nextValue => setValuePassword(nextValue)}
           />
          <Spacer height={20}/>
           <Input
          value={valueConfirmPassword}
          label='Confirm Password'
          placeholder='Enter your password'
          caption={renderCaptionConfirmPassword}
          secureTextEntry={secureTextEntry}
          onChangeText={nextValue => setValueConfirmPassword(nextValue)}
           />
          <Spacer height={20}/>
        <Button onPress={() => registerButton()}>REGISTER</Button>
        <Spacer/>
        <Text style={styles.subTitle}>Already have an account?</Text>
        <Pressable
         onPress={() => {
          navigateToLogin();
        }}>
        <Text style={styles.registerButton}>Login here</Text>
        </Pressable>
      </Layout>
    </SafeAreaView>
  );
};