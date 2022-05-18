import React, { useState, useEffect } from 'react';
import { SafeAreaView, Platform, View, TouchableWithoutFeedback, Pressable } from 'react-native';
import styles from './styles';
import { Divider, Layout, TopNavigation, Input, Text, Button, Icon} from '@ui-kitten/components';
import { Spacer, LoadingSpinner } from '../../../custom_components';
import { toastMessage } from '../../../custom_components';
import { setisLoading } from '../../store/app/appSlice'
import { useDispatch, useSelector } from 'react-redux';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {API} from '@env';
import { ScrollView } from 'react-native-gesture-handler';
import { getLogByDay } from '../../../axios/food';

export const viewLogByDay = ({ navigation }) => {

const dispatch = useDispatch(); // dispatch function from redux toolkit

const isLoading = useSelector(state => state.app.isLoading.payload); // loading state

const baseUrl = API; // get api from axios

const language = 'ms'; // set teh language to en

// state for query and data array
const [data, setData] = useState([]); // state for the fetched result from db
const [Breakfast, setBreakfast] = useState({});
const [Lunch, setLunch] = useState({});
const [Dinner, setDinner] = useState({});

// render calendar icon
const CalendarIcon = (props) => (
  <Icon {...props} name='calendar'/>
);

// initial date
const [rawDateTime, setRawDateTime] = useState(new Date());
const [date, setDate] = useState('');

const navigateToDashboard = () => {
  navigation.navigate('Home');
}

// function to handle datetime changes
const onChange = (event, selectedDate) => {
  const currentDate = selectedDate;
  setRawDateTime(currentDate);
};

// render date or time picker acording to value passed
const showMode = (currentMode) => {
  DateTimePickerAndroid.open({
    value: rawDateTime,
    onChange,
    mode: currentMode,
    is24Hour: true
  })
};

// show date picker
const showDatepicker = () => {
  showMode('date');
};

useEffect(() => {
  rawDateTime.setHours(0,0,0,0);
})

// function to convert date time into human readible date
const convertDate = () => {
  var date = rawDateTime.getDate();
  var month = rawDateTime.getMonth();
  var year = rawDateTime.getFullYear();
  var MonthName =  ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  setDate(date + '-' + MonthName[month] + '-' + year); // update the date variable
};

// use effect hook to make sure the function only runs once when the data change
useEffect(() => {
  clearRecord();
  retreiveLog();
  convertDate();
}, [rawDateTime]);

// function to add 1 day 
const addDay = async() => {
  const tempdate = rawDateTime; // temporary holder for date
  tempdate.setDate(tempdate.getDate() + 1); // update date in the temporary holder
  setRawDateTime(new Date(tempdate)); // update the date state
}

// function to add 1 day 
const minusDay = async() => {
  const tempdate = rawDateTime; // temporary holder for date
  tempdate.setDate(tempdate.getDate() - 1); // update date in the temporary holder
  setRawDateTime(new Date(tempdate)); // update the date state
}

const retreiveLog = async() => {
  const startDate = new Date (rawDateTime); // define start date
  const endDate = new Date (startDate); // define end date
  endDate.setDate(endDate.getDate() + 1); // + 1 day
  const result = await getLogByDay(startDate, endDate);
  setData(result);
}

const clearRecord = async() => {
  // clear all state when date change
  setData({});
  setBreakfast({});
  setLunch({});
  setDinner({});
}

const formatLog = async() => {
  try {
    data.forEach(element => { // loop the data array 
      if (element.log_meal_type == "Breakfast") { // match the meal type with the string
          setBreakfast(element); // set the data in current loop into the state
      } else if (element.log_meal_type == "Lunch") {
          setLunch(element);
      } else if (element.log_meal_type == "Dinner") {
          setDinner(element);
      }
    }
    )
  } catch (error) {

  }
}

useEffect(() => { // use effect to make sure the function is runned once
  formatLog();
}, [data]);

const RenderSelection = () => {
  if (selected.length==0) { // if the food array is empty,
    return null; // do nothing
  } else {
    return selected.map((element, index) => // map the array to get the element inside, then render the component based on the element in the array
    <Layout style={styles.foodCard} level='3'>
      <Text style={styles.foodText}>{index+1}. {element.food_name}</Text>
      {/* input to show the serving size */}
      <Layout style={styles.layoutCard}>
        {!isDelete?
        (<Layout style={styles.servingContainer}>
        <Button style={styles.servingButton} size='small' accessoryRight={MinusIcon} onPress={() => minusServingSize(index)}></Button>
        <Input style={styles.servingText} size='small' value={element.serving_size.toString()}/>
        <Button style={styles.servingButton} size='small' accessoryRight={PlusIcon} onPress={() => addServingSize(index)}></Button>
        </Layout>) :
        (<Layout>
        <Button style={styles.deleteButton} size='small' accessoryRight={TrashIcon} status='danger' onPress={() => deleteFood(index)}></Button>
        </Layout>)}
      </Layout>
    </Layout>
    );
  } 
}

return (
  <SafeAreaView style={{ flex: 1 }}>
    <Layout style={styles.card}>
    {isLoading==true ? <LoadingSpinner/> : null}
      <ScrollView style={styles.scroll}>
      {/* if isLoading == true, show loading screen */}
      <Text style={styles.title}>View your logged food</Text>
      <Spacer height={20}/>
      <Layout style={styles.subCard}>
        <Button
        style={styles.buttonDate}
        onPress={() => minusDay()}> 
        <Text style={styles.buttonDateTimeText}>-</Text>
        </Button>
        <Pressable onPress={() => showDatepicker()}>
        <Layout style={styles.dateContainer} level='2'>
        <Text style={styles.dateText}>{date}</Text>
        </Layout>
        </Pressable>
        <Button
        style={styles.buttonDate}
        onPress={() => addDay()}> 
        <Text style={styles.buttonDateTimeText}>+</Text>
        </Button>
      </Layout>
      <Spacer height={30}/>
      <Layout style={styles.foodContainer}>
      {/* if the selected array has any item inside, render the ui component to display user's selection */}
      <Layout style={styles.containerHeader}>
      <Text>Breakfast</Text>
      </Layout>
      <Layout style={styles.foodCard} level='3'>
      <Text style={styles.foodText}>1. Nasi Lemak</Text>
      {/* input to show the serving size */}
      <Layout style={styles.layoutCard}>
      </Layout>
    </Layout>
      </Layout>
      <Spacer/>
      {/* if the selected array has any item inside, render the submit button*/}
      </ScrollView>
    </Layout>
  </SafeAreaView>
  );
};