import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen } from '../screen/splashScreen/index';
import { LoginScreen } from '../auth/login';
import { RegisterScreen } from '../auth/register/index';
import { HomeScreen } from '../screen/dashboard/index';
import { ProfileScreen } from '../screen/profile/index';
import { LogFoodScreen } from '../screen/logFood/index';
import { viewLogByDay } from '../screen/viewLogByDay/index';
import { viewFoodNutrition } from '../screen/viewFoodNutrition/index';
import { viewNutrientReport } from '../screen/viewNutrientReport';
import { useSelector, useDispatch } from 'react-redux';

const { Navigator, Screen } = createStackNavigator();

export const AppNavigator = () => {

  const isLogin = useSelector(state => state.auth.loginStatus); //get login status from redux

  // const MainNavigator = () => (
  //   <Navigator screenOptions={{headerShown: false}} initialRouteName="Splash">
  //     <Screen name='Splash' component={SplashScreen}/>
  //     {isLogin ? ( // if isLogin is true, show default navigation option
  //   <>
  //     <Screen name='Home' component={HomeScreen}/>
  //     <Screen name='Details' component={DetailsScreen}/>
  //   </>
  // ) : ( // else, show login screen
  //   <>
  //     <Screen name='Login' component={LoginScreen}/>
  //   </>
  // )}
  //   </Navigator>
  // );

  const MainNavigator = () => (
      <Navigator screenOptions={{headerShown: false}}>
        <Screen name='Splash' component={SplashScreen}/>
        <Screen name='Login' component={LoginScreen}/>
        <Screen name='Register' component={RegisterScreen}/>
        <Screen name='Home' component={HomeScreen}/>
        <Screen name='Profile' component={ProfileScreen}/>
        <Screen name='LogFood' component={LogFoodScreen}/>
        <Screen name='ViewLogByDay' component={viewLogByDay}/>
        <Screen name='ViewFoodNutrition' component={viewFoodNutrition}/>
        <Screen name='ViewNutrientReport' component={viewNutrientReport}/>
      </Navigator>
    );

  return(
  <NavigationContainer>
    <MainNavigator/>
  </NavigationContainer>
  )
}