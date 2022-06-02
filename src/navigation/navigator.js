import React from 'react';
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
import { SettingScreen } from '../screen/setting';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';
export const AppNavigator = () => {

  const isLogin = useSelector(state => state.auth.loginStatus); // get login status from the redux state

  const { Navigator, Screen } = isLogin?createBottomTabNavigator():createStackNavigator(); // create bottom tab bar if user are logged in

  // create bottom tab
    const BottomTabBar = ({ navigation, state }) => (
      <BottomNavigation
        selectedIndex={state.index} // determine which tab should be active based on the selected index
        // onSelect, change the index of the current active screen *
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab title='Home'/>
        <BottomNavigationTab title='Profile'/>
        <BottomNavigationTab title='Settings'/>
      </BottomNavigation>
    );
    
    const MainNavigator  = () => (
      <Navigator  tabBar={props => <BottomTabBar {...props} />} screenOptions={{headerShown: false}} >
        <Screen name='Home' component={HomeScreen}/>
        <Screen name='Profile' component={ProfileScreen}/>
        <Screen name='SettingScreen' component={SettingScreen}/>
        <Screen name='LogFood' component={LogFoodScreen}/>
        <Screen name='ViewLogByDay' component={viewLogByDay}/>
        <Screen name='ViewFoodNutrition' component={viewFoodNutrition}/>
        <Screen name='ViewNutrientReport' component={viewNutrientReport}/>
      </Navigator>
    );

    const AuthNavigator = () => (
      <Navigator screenOptions={{headerShown: false}}>
        <Screen name='Splash' component={SplashScreen}/>
        <Screen name='Login' component={LoginScreen}/>
        <Screen name='Register' component={RegisterScreen}/>
      </Navigator>
    );

    // if isLogin is false, show the auth navigator.
    // else, show the main navigator
  return(
  <NavigationContainer>
    {isLogin ? (
    <MainNavigator />)
    :(
      <AuthNavigator/>
    )}
  </NavigationContainer>
  )
}