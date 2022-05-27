import React, {useContext, useState} from 'react';
import styles from './styles';
import { SafeAreaView, Pressable } from 'react-native';
import { Button, Layout, Icon, Text, Toggle } from '@ui-kitten/components';
import { ThemeContext } from '../../theme/theme-context';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingSpinner, Spacer } from '../../../custom_components';
import notifee, { TimestampTrigger, TriggerType, RepeatFrequency, AndroidImportance } from '@notifee/react-native';
import { DrawerActions } from '@react-navigation/native';

export const HomeScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.app.isLoading.payload);
  const themeContext = useContext(ThemeContext);
  const currentTheme = themeContext.theme;

  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  const navigateProfile = () => {
    navigation.navigate('Profile');
  }

  const navigateLogFood = () => {
    navigation.navigate('LogFood');
  }

  const navigateViewLoggedFood = () => {
    navigation.navigate('ViewLogByDay');
  }

  const navigateNutrientReport = () => {
    navigation.navigate('ViewNutrientReport');
  }

  const check = async() => {
    const result = await notifee.getTriggerNotifications();
    console.log(result);
  }

const deleteNotification = async() => {
  var current = await notifee.getTriggerNotificationIds();
  await notifee.cancelTriggerNotifications(current);
}

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* {isLoading?<LoadingSpinner/>:null} */}
      <Layout style={styles.mainContainer}>
        <Layout style={styles.toggleBarContainer}>
          <Toggle checked={currentTheme=='light'?false:true}
                  onChange={themeContext.toggleTheme}>
          </Toggle>
          <Icon style={styles.icon}
                fill={currentTheme=='light'?'#ffae42':'#ffffff'}
                name={currentTheme=='light'?'sun':'moon'}
          />
          </Layout>
        <Button style={{ marginVertical: 4 }} onPress={() => navigateLogFood()}>Log Food</Button>
        <Spacer/>
        <Button style={{ marginVertical: 4 }} onPress={() => navigateViewLoggedFood()}>View Logged Food</Button>
        <Spacer/>
        <Button style={{ marginVertical: 4 }} onPress={() => navigateNutrientReport()}>View Nutrient Report</Button>
        <Spacer/>
      </Layout>
    </SafeAreaView>
  );
};