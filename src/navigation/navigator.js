import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screen/dashboard';
import { DetailsScreen } from '../screen/details';
import { LoginScreen } from '../auth/login';

const { Navigator, Screen } = createStackNavigator();

//const [isLogin, setIsLogin] = useState(false);

const isLogin = false;

const MainNavigator = () => (
  <Navigator screenOptions={{headerShown: false}}>
    {isLogin ?
    <Screen name='Home' component={HomeScreen}/> :
    <Screen name='Login' component={LoginScreen}/>}
    <Screen name='Details' component={DetailsScreen}/>
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <MainNavigator/>
  </NavigationContainer>
);