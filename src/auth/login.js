import React from 'react';
import { SafeAreaView, Platform, View, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import { Button, Divider, Layout, TopNavigation, Input, Text, Icon } from '@ui-kitten/components';
import { Spacer } from '../../custom_components';
import { login } from '../../axios/auth';
import { toastMessage } from '../../custom_components';
import { setLoginSession } from '../store/auth/authSlice';
import { useDispatch } from 'react-redux';

export const LoginScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  async function loginButton() { // login function
    var response = await login(valueID, valuePassword); // call the login function from axios
    if (!response) { // if the response is null
      dispatch(setLoginSession()); // update redux state
      toastMessage('Login successfully'); // display successful message to user
    } else { // if there is any error message returned, display it
    toastMessage(response);
    }
  }

  const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline'/>
  );

  const [valueID, setValueID] = React.useState('');

  const [valuePassword, setValuePassword] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* if it is ios system, show the top navigation bar */}
      {Platform.OS === 'ios' ? <TopNavigation title='Login' alignment='center'/> : null} 
      <Divider/>
      <Layout style={styles.card}>
        <Input
          placeholder='Enter your ID'
          value={valueID}
          onChangeText={nextValue => setValueID(nextValue)}
        />
        <Spacer height={32}/>
        <Input
          value={valuePassword}
          label='Password'
          placeholder='Place your Text'
          caption={renderCaption}
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={nextValue => setValuePassword(nextValue)}
           />
          <Spacer height={32}/>
        <Button onPress={() => loginButton()}>LOGIN</Button>
      </Layout>
    </SafeAreaView>
  );
};