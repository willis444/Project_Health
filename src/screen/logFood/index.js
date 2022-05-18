import React, { useState, useEffect } from 'react';
import { SafeAreaView, Platform, View, TouchableWithoutFeedback, Pressable } from 'react-native';
import styles from './styles';
import { Divider, Layout, TopNavigation, Input, Text, Autocomplete, AutocompleteItem, Button, Icon, ButtonGroup, IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { Spacer, LoadingSpinner } from '../../../custom_components';
import { toastMessage } from '../../../custom_components';
import { setisLoading } from '../../store/app/appSlice'
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { useDispatch, useSelector } from 'react-redux';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {API} from '@env';
import { ScrollView } from 'react-native-gesture-handler';
import { addNewFoodRecord } from '../../../axios/food';

export const LogFoodScreen = ({ navigation }) => {

const dispatch = useDispatch(); // dispatch function from redux toolkit

const isLoading = useSelector(state => state.app.isLoading.payload); // loading state

const foodName = useSelector(state => state.food.foodName);

const baseUrl = API; // get api from axios

const language = 'ms'; // set teh language to en

const getData = () => fetch(`${baseUrl}/food/findFood/${query}/${language}`); // retreive available food from the database based on the query
const requestDataWithDebounce = AwesomeDebouncePromise(getData, 600); // call the getData function after 400ms the user stopped typing

// state for query and data array
const [query, setQuery] = useState(""); // state for search bar
const [data, setData] = useState([]); // state for the fetched result from db
const [selected, setSelected] = useState([]); // state for the selected food
const [selectedIndex, setSelectedIndex] = useState(new IndexPath(1)); // state for the meals type selection
const [isDelete, toggleisDelete] = useState(false);

// option for the selection bar
const mealType = [
  'Breakfast',
  'Lunch',
  'Dinner',
];

// map the selected index to the option above
const selectedOption = mealType[selectedIndex.row];

// function for updating the suggestion list
const updateData = async() => {
    try {
    const response = await requestDataWithDebounce(); // get response form the api
      const data = await response.json(); // convert the response into json
      //const filtered = await applyFilter(data); // apply the query filter to the result
      setData(data); // set the filtered data into the data state
    } catch (error) {
    }
  };

useEffect(updateData, [query]); // useeffect to refresh the entire page when the query change

const onSelect = (index: number) => { // function to handle the selected input from the search bar
  var found = false;
  var obj = {food_id:data[index]._id, food_name: data[index].title, serving_size: 1}; // set the movie title and serving size into an object
  selected.forEach(element => { // check the array to see if there is existing food with same name inside the array
    if(element.food_name == data[index].title) { // if the food name equals to the current food name of the element
      element.serving_size = element.serving_size + 1; // increase the serving size by 1
      found = true; // flag variable == true
    }
  });
  if (found==false){ // if flag variable == false
  selected.push(obj); // push the current food into the array
  }
  setQuery(""); // clear the selected state
  setData([]); // clear the fetched result from db
};

const onChangeText = (nextQuery) => { // function to handle user input
  setQuery(nextQuery);
};

// dropped because the result returned from db is already filtered by the db itself, 
// applying the filter in front end once again is redundant
const applyFilter = (options) => { // filter function to filter the data retrieved with the user's input
  return options.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
};

const renderOptionAutoComplete = (item, index) => ( // render the auto complete component
  <AutocompleteItem
    key={index}
    title={item.title}
  />
);

// render calendar icon
const CalendarIcon = (props) => (
  <Icon {...props} name='calendar'/>
);

// render clock icon
const ClockIcon = (props) => (
  <Icon {...props} name='clock-outline'/>
);

// render + icon
const PlusIcon = (props) => (
  <Icon {...props} name='plus-outline'/>
);

// render - icon
const MinusIcon = (props) => (
  <Icon {...props} name='minus-outline'/>
);

const TrashIcon = (props) => (
  <Icon {...props} name='trash-2-outline'/>
);

// initial date
const [rawDateTime, setRawDateTime] = useState(new Date());
const [date, setDate] = useState('');
const [time, setTime] = useState('');

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

// show time picker
const showTimepicker = () => {
  showMode('time');
};

// function to convert date time into human readible date
const convertDate = () => {
  var date = rawDateTime.getDate();
  var month = rawDateTime.getMonth();
  var year = rawDateTime.getFullYear();
  var MonthName =  ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  setDate(date + '-' + MonthName[month] + '-' + year); // update the date variable
};

// function to convert date time into human readible time
const convertTime = () => {
  var hours = (rawDateTime.getHours() < 10 ? '0' : '') + rawDateTime.getHours();
  var minutes = (rawDateTime.getMinutes() < 10 ? '0' : '') + rawDateTime.getMinutes();
  var time = (hours + ':' + minutes); // update the time variable
  setTime(time);
}

// use effect hook to make sure the function only runs once when the data change
useEffect(() => {
  convertDate()
}, [rawDateTime]);

useEffect(() => {
  convertTime()
}, [rawDateTime]);

// function to decrease serving size 
function minusServingSize (index){
  var value = selected[index].serving_size;
  if (value >0.25) {
    let newArr = [...selected]; // copying the old datas array
    newArr[index].serving_size = value -0.25; // update the selected array
    setSelected(newArr); // update selected array
  } else {
    toastMessage("The minimum serving size is 0.25");
  }
}

// function to increase serving size
function addServingSize (index){
  var value = selected[index].serving_size;
  if (value <99) {
    let newArr = [...selected]; // copying the old datas array
    newArr[index].serving_size = value + 0.25; // update the selected array
    setSelected(newArr); // update selected array
  } else {
    toastMessage("The minimum serving size is 99");
  }
}

function toggleDelete() {
  if (isDelete == true) {
    toggleisDelete(false);
  } else {
    toggleisDelete(true);
  }
}

function deleteFood (index) {
  var name = selected[index].food_name;
  setSelected(selected.filter(element => element.food_name !== name));
}

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

const addFoodToDB = async() => {
  dispatch(setisLoading(true));
  const datetime = rawDateTime; // get date time from the state
  const meal_type = selectedOption; // get the meal type from the selection option
  var foodArr = [];
  var serveSizeArr = [];
  selected.forEach(element=> { // push the food id and serving size into the array
      foodArr.push(element.food_id),
      serveSizeArr.push(element.serving_size)
  })
  const result = await addNewFoodRecord(datetime, meal_type, foodArr, serveSizeArr); // call the api
  if (result == "Update successful") { // if the result is successful
    navigateToDashboard(); // navigate the user to dashboard
    dispatch(setisLoading(false));
    return toastMessage(result);
  } else { // error handling
    toastMessage(result); // display error message
    dispatch(setisLoading(false));
  }
}

return (
  <SafeAreaView style={{ flex: 1 }}>
    <Layout style={styles.card}>
    {isLoading==true ? <LoadingSpinner/> : null}
      <ScrollView style={styles.scroll}>
      {/* if isLoading == true, show loading screen */}
      <Text style={styles.title}>Log your food</Text>
      <Spacer height={20}/>
      <Text style={styles.captionText}>Select Date</Text>
      <Layout style={styles.subCard}>
      <Input
        style={styles.inputDateTime}
        value={date}
        disabled={true}
        />
      <Button
      style={styles.buttonDateTime}
          onPress={() => showDatepicker()}
          accessoryRight={CalendarIcon}> 
          Select Date 
          </Button>
      </Layout>
      <Spacer/>
      <Text style={styles.captionText}>Select time (24 hours system)</Text>
      <Layout style={styles.subCard}>
      <Input
        style={styles.inputDateTime}
        value={time}
        disabled={true}
        />
      <Button
        style={styles.buttonDateTime}
        onPress={() => showTimepicker()}
        accessoryRight={ClockIcon}> 
        Select Time 
        </Button>
      </Layout>
      <Spacer/>
      <Text style={styles.captionText}>Select your meal type</Text>
      <Select
        selectedIndex={selectedIndex}
        value = {selectedOption}
        onSelect={index => setSelectedIndex(index)}>
        <SelectItem title='Breakfast'/>
        <SelectItem title='Lunch'/>
        <SelectItem title='Dinner'/>
      </Select>
      <Spacer height={30}/>
      <Autocomplete
        style={styles.searchBar}
        placeholder='For example, Nasi Lemak'
        value={query}
        onChangeText={onChangeText}
        onSelect={onSelect}>
        {data.map(renderOptionAutoComplete)}
      </Autocomplete>
      <Spacer height={30}/>
      <Layout style={styles.foodContainer}>
      {/* if the selected array has any item inside, render the ui component to display user's selection */}
      {selected.length == 0?null :
      <Layout style={styles.containerHeader}>
      <Text>Selected food</Text>
      <Pressable style={styles.deleteText} onPress={toggleDelete}>
      <Text status={'danger'}>Delete</Text>
      </Pressable>
      </Layout>
      }
      {selected.length == 0?null:<RenderSelection/>}
      </Layout>
      <Spacer/>
      {/* if the selected array has any item inside, render the submit button*/}
      {selected.length == 0?null:<Button onPress={() => addFoodToDB()}>Log My Meals</Button>}
      </ScrollView>
    </Layout>
  </SafeAreaView>
  );
};