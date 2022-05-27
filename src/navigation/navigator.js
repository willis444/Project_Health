import React, { useState } from 'react';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
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
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer, DrawerItem, Layout, Text, IndexPath } from '@ui-kitten/components';

const { Navigator, Screen } = createDrawerNavigator();

export const AppNavigator = () => {

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
        <Screen name='SettingScreen' component={SettingScreen}/>
      </Navigator>
    );

    const DrawerContent = ({ navigation, state }) => (
      <Drawer
        selectedIndex={new IndexPath(state.index)}
        onSelect={index => {
          navigation.navigate(state.routeNames[index.row])
          }}>
        <DrawerItem title='Home' />
        <DrawerItem title='Profile' />
        <DrawerItem title='Settings'/>
      </Drawer>
    );
    
    const DrawerNavigator = () => (
      <Navigator drawerContent={props => <DrawerContent {...props}/>} initialRouteName={'Splash'} screenOptions={{headerShown: false}} >
        <Screen name='Home' component={HomeScreen}/>
        <Screen name='Profile' component={ProfileScreen}/>
        <Screen name='SettingScreen' component={SettingScreen}/>
        <Screen name='Login' component={LoginScreen} options={{swipeEnabled: false}}/>
        <Screen name='Register' component={RegisterScreen} options={{swipeEnabled: false}}/>
        <Screen name='LogFood' component={LogFoodScreen}/>
        <Screen name='ViewLogByDay' component={viewLogByDay}/>
        <Screen name='ViewFoodNutrition' component={viewFoodNutrition}/>
        <Screen name='ViewNutrientReport' component={viewNutrientReport}/>
        <Screen name='Splash' component={SplashScreen}/>
      </Navigator>
    );

  return(
  <NavigationContainer>
    <DrawerNavigator/>
  </NavigationContainer>
  )
}