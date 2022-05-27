import React, {useState} from 'react';
import { SafeAreaView } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, Button } from '@ui-kitten/components';
import { Spacer } from '../../../custom_components';
import { useDispatch } from 'react-redux';
import { retrieveUserProfile, setisLoading } from '../../store/app/appSlice';
import { checkJWT } from '../../../AsyncStorage/store';
import notifee, { TimestampTrigger, TriggerType, RepeatFrequency, AndroidImportance } from '@notifee/react-native';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const SplashScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  //const isLogin = checkJWT();

  async function checkLogin() {
    const isLogin = await checkJWT(); // get login status from async storage
    if (isLogin === true) { // if the result is true
      //dispatch(setisLoading(true));
      dispatch(retrieveUserProfile());
      navigation.reset({ // navigate user to homescreen and reset the route
        index: 0,
        routes: [{ name: 'Home' }],
      });
      return true;
    } else if (isLogin === false) { // if the result is false
      navigation.reset({ // navigate user to homescreen and reset the route
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } else {
      console.log('error!');
    }
  }

const [detail, setDetail] = useState(); // state for event listener

notifee.onBackgroundEvent(async ({type, detail}) => { // background event listener
  console.debug('onBackgroundEvent handler');
});

const createTrigger = (timestamp, message) => { // create notification
  const date = timestamp;
  const trigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date, // schedule 15 seconds later
    alarmManager: {
      allowWhileIdle: true, // allow the notification to show when android is under low power mode
    },
    repeatFrequency: RepeatFrequency.DAILY, // set to repeat daily
  };

  notifee
    .createChannel({ // channel is required for every notification
      id: 'notifeetest',
      name: 'Default Channel',
      sound: 'default', // define the sound used for the notification
    })
    .then(channelId => {
      notifee
        .createTriggerNotification(
          {
            title: message + ' reminder',
            body: `Hello, it's time for `+ message + ` remember to log your meals!`,
            android: {
              channelId,
              importance: AndroidImportance.HIGH,
              pressAction: {
                id: 'default',
              },
            },
          },
          trigger,
        )
    })
    .catch(e => console.log(e));
};

const clearNotification = async() => {
  var current = await notifee.getTriggerNotificationIds(); // get every active notification 
  await notifee.cancelTriggerNotifications(current);
}

const createNotification = () => {
  clearNotification();
  const mealsType = ["Breakfast", "Lunch", "Dinner"];
  const rawDate = new Date(); // initialise a new date 
  // set hours for breakfast, lunch and dinner notification using the rawdate initiated
  const breakfastDate = new Date(rawDate).setHours(7,0,0,0);
  const lunchDate = new Date(rawDate).setHours(11,0,0,0);
  const dinnerDate = new Date(rawDate).setHours(18,0,0,0);
  var date = [breakfastDate, lunchDate, dinnerDate];
  date.forEach((element, index) => {
    var compare = new Date(element);
    if (compare < new Date()) {
      compare.setDate(compare.getDate()+1); // + 1 date to the current date to push the notification to tomorrow
      date[index] = compare.getTime();; // set the timestamp from the updated date into the array
    }
  })
  for (let i = 0; i<mealsType.length; i++) { // loop the meals type array
    createTrigger(date[i], mealsType[i]); // call the create trigger function using the data in date and mealstype array
  }
  }

  createNotification();
  checkLogin();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spacer/>
      <Text style={{fontSize: 80}}>Splash Screen!</Text>
      </Layout>

    </SafeAreaView>
  );
};