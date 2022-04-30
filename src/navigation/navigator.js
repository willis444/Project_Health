import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screen/dashboard';
import { DetailsScreen } from '../screen/details';
import { LoginScreen } from '../auth/login';
import { useSelector, useDispatch } from 'react-redux';

const { Navigator, Screen } = createStackNavigator();

export const AppNavigator = () => {
  var isLogin = useSelector(state => state.auth.loginStatus); //get login status from redux

  console.log("navigator " + useSelector((state) => state.auth.loginStatus));

  const MainNavigator = () => (
    <Navigator screenOptions={{headerShown: false}}>
      {isLogin ? ( // if isLogin is true, show default navigation option
    <>
      <Screen name='Home' component={HomeScreen}/>
      <Screen name='Details' component={DetailsScreen}/>
    </>
  ) : ( // else, show login screen
    <>
      <Screen name='Login' component={LoginScreen}/>
    </>
  )}
    </Navigator>
  );

  return(
  <NavigationContainer>
    <MainNavigator/>
  </NavigationContainer>
  )
}