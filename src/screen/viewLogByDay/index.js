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
const [Breakfast, setBreakfast] = useState([]);
const [BreakfastCount, setBreakfastCount] = useState([]);
const [Lunch, setLunch] = useState([]);
const [LunchCount, setLunchCount] = useState([]);
const [Dinner, setDinner] = useState([]);
const [DinnerCount, setDinnerCount] = useState([]);
const [mealTime, setMealTime] = useState({Breakfast: null, Lunch: null, Dinner: null});

// render calendar icon
const CalendarIcon = (props) => (
  <Icon {...props} name='calendar'/>
);

// initial date
const [rawDateTime, setRawDateTime] = useState(new Date());
const [date, setDate] = useState('');

const navigateToViewFoodNutrition = (data, size) => {
  navigation.navigate('ViewFoodNutrition', {data, size});
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
const convertDate = async() => {
  var date = rawDateTime.getDate();
  var month = rawDateTime.getMonth();
  var year = rawDateTime.getFullYear();
  var MonthName =  ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  setDate(date + '-' + MonthName[month] + '-' + year); // update the date variable
};

const convertTime = (rawTime) => {
  const newTime = new Date (rawTime); // declare a new date instance
  var hours = (newTime.getHours() < 10 ? '0' : '') + newTime.getHours();
  var minutes = (newTime.getMinutes() < 10 ? '0' : '') + newTime.getMinutes();
  var time = (hours + ':' + minutes); // update the time variable
  return time;
}

// on date change, use effect hook to make sure the function only runs once when the data change
useEffect(async() => {
  clearRecord(); // clear all the previous state
  retreiveLog(); // fetch the data from db
  convertDate(); // convert the raw date into human readible dates
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
  setData([]);
  setBreakfast([]);
  setBreakfastCount([]);
  setLunch([]);
  setLunchCount([]);
  setDinner([]);
  setDinnerCount([]);
  setMealTime({});
}

const formatLog = async() => {
  try {
    data.forEach(element => { // loop the data array 
      if (element.log_meal_type == "Breakfast") { // match the meal type with the string
        let newObj = mealTime; // declare temporary object
        var formatted = convertTime(element.log_datetime); // convert the raw time into human readible time
        mealTime.Breakfast = formatted; // mutate the temporary object with the converted time
        setMealTime(newObj); // replace the state object with the temporary object
        element.log_serving_size.forEach(element => { // loop the log serving size
          setBreakfastCount(currentArray => [...currentArray, element]) // put the data in current loop into the array state
        })
        element.food_details.forEach(element => { // loop the food_details section of the fetched data
          setBreakfast(currentArray => [...currentArray, element]); // put the data in current loop into the array state
        })
      } else if (element.log_meal_type == "Lunch") {
        let newObj = mealTime; // declare temporary object
        var formatted = convertTime(element.log_datetime); // convert the raw time into human readible time
        mealTime.Lunch = formatted; // mutate the temporary object
        setMealTime(newObj); // replace the state object with the temporary object
        element.log_serving_size.forEach(element => { // loop the log serving size
          setLunchCount(currentArray => [...currentArray, element]) // put the data in current loop into the array state
        })
        element.food_details.forEach(element => { // loop the food_details section of the fetched data
          setLunch(currentArray => [...currentArray, element]); // put the data in current loop into the array state
        })
      } else if (element.log_meal_type == "Dinner") {
        let newObj = mealTime; // declare temporary object
        var formatted = convertTime(element.log_datetime); // convert the raw time into human readible time
        mealTime.Dinner = formatted; // mutate the temporary object
        setMealTime(newObj); // replace the state object with the temporary object
        element.log_serving_size.forEach(element => { // loop the log serving size
          setDinnerCount(currentArray => [...currentArray, element]) // put the data in current loop into the array state
        })
        element.food_details.forEach(element => { // loop the food_details section of the fetched data
          setDinner(currentArray => [...currentArray, element]); // put the data in current loop into the array state
        })
      }
    }
    )
  } catch (error) {
    console.log(error);
  }
}

useEffect(() => { // use effect to make sure the function is runned once
  formatLog();
}, [data]);

const RenderBreakfast = () => {
  var size;
  return Breakfast.map((element, index) => // map the array to get the element inside, then render the component based on the element in the array
  <Layout style={styles.cardContainer} level='3'>
    <Pressable onPress={() => navigateToViewFoodNutrition(element, BreakfastCount)}>
      <Layout style={styles.foodCard} level='2'>
            <Text style={styles.foodText}>{index + 1}. {language == 'ms'?element.food_alt_name: element.food_name}</Text>
            {/* input to show the serving size */}
            <Layout style={styles.layoutCard}>
            {BreakfastCount.forEach(serving_count => { // loop through the breasfastcount array
              if (serving_count.food_id == element._id) { // if the food_id match with the element id, means the serving count matches for that food
                size = serving_count.size;
              }
            })}
          <Input style={styles.servingText} size='small' value={size}/>
        </Layout>
      </Layout>
    </Pressable>
  </Layout>
  );
}

const RenderLunch = () => {
  var size;
  return Lunch.map((element, index) => // map the array to get the element inside, then render the component based on the element in the array
  <Layout style={styles.cardContainer} level='3'>
    <Pressable onPress={() => navigateToViewFoodNutrition(element, LunchCount)}>
      <Layout style={styles.foodCard} level='2'>
      <Text style={styles.foodText}>{index + 1}. {language == 'ms'?element.food_alt_name: element.food_name}</Text>
      {/* input to show the serving size */}
      <Layout style={styles.layoutCard}>
       {LunchCount.forEach(serving_count => { // loop through the breasfastcount array
        if (serving_count.food_id == element._id) { // if the food_id match with the element id, means the serving count matches for that food
          size = serving_count.size;
        }
      })}
      <Input style={styles.servingText} size='small' value={size}/>
      </Layout>
      </Layout>
    </Pressable>
  </Layout>
  );
}

const RenderDinner = () => {
  var size;
  return Dinner.map((element, index) => // map the array to get the element inside, then render the component based on the element in the array
    <Layout style={styles.cardContainer} level='3'>
      <Pressable onPress={() => navigateToViewFoodNutrition(element, LunchCount)}>
        <Layout style={styles.foodCard} level='2'>
          <Text style={styles.foodText}>{index + 1}. {language == 'ms'?element.food_alt_name: element.food_name}</Text>
          {/* input to show the serving size */}
          <Layout style={styles.layoutCard}>
            {DinnerCount.forEach(serving_count => { // loop through the breasfastcount array
            if (serving_count.food_id == element._id) { // if the food_id match with the element id, means the serving count matches for that food
              size = serving_count.size;
            }
          })}
          <Input style={styles.servingText} size='small' value={size}/>
        </Layout>
      </Layout>
    </Pressable>
  </Layout>
  );
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
      {Breakfast.length == 0 ?null : 
      <Layout style={styles.containerHeader}>
      <Text>Breakfast</Text>
      <Pressable style={styles.mealText}>
      <Text>{mealTime.Breakfast}</Text>
      </Pressable>
      </Layout>}
      {Breakfast.length == 0? null : <RenderBreakfast/>}
      <Spacer/>
      {Lunch.length == 0 ?null : 
      <Layout style={styles.containerHeader}>
      <Text>Lunch</Text>
      <Pressable style={styles.mealText}>
      <Text>{mealTime.Lunch}</Text>
      </Pressable>
      </Layout>}
      {Lunch.length == 0? null : <RenderLunch/>}
      <Spacer/>
      {Dinner.length == 0 ?null : 
      <Layout style={styles.containerHeader}>
      <Text>Dinner</Text>
      <Pressable style={styles.mealText}>
      <Text>{mealTime.Dinner}</Text>
      </Pressable>
      </Layout>}
      {Dinner.length == 0? null : <RenderDinner/>}
      </Layout>
      <Spacer/>
      {/* if the selected array has any item inside, render the submit button*/}
      </ScrollView>
    </Layout>
  </SafeAreaView>
  );
};