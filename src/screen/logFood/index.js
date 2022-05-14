import React, { useState, useEffect } from 'react';
import { SafeAreaView, Platform, View, TouchableWithoutFeedback, Pressable } from 'react-native';
import styles from './styles';
import { Divider, Layout, TopNavigation, Input, Text, Autocomplete, AutocompleteItem, Button, Icon } from '@ui-kitten/components';
import { Spacer, LoadingSpinner } from '../../../custom_components';
import { toastMessage } from '../../../custom_components';
import { setisLoading } from '../../store/app/appSlice'
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { useDispatch, useSelector } from 'react-redux';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {API} from '@env';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { ScrollView } from 'react-native-gesture-handler';

export const LogFoodScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.app.isLoading.payload);

  const foodName = useSelector(state => state.food.foodName);

  const baseUrl = API;
  
  const getData = () => fetch(`${baseUrl}/food/findFood/${query}`); // retreive available food from the database based on the query
  const requestDataWithDebounce = AwesomeDebouncePromise(getData, 400); // call the getData function after 400ms the user stopped typing

  // state for query and data array
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  // function for updating the suggestion list
  const updateData = async() => {
      try {
      const response = await requestDataWithDebounce(); // get response form the api
        const data = await response.json(); // convert the response into json
        const filtered = await applyFilter(data); // apply the query filter to the result
        setData(filtered); // set the filtered data into the data state
      } catch (error) {
      }
    };

  useEffect(updateData, [query]); // useeffect to refresh the entire page when the query change

  const onSelect = (index: number) => { // function to handle the selected input from the search bar
    setQuery(data[index].title);
  };

  const onChangeText = (nextQuery) => { // function to handle user input
    setQuery(nextQuery);
  };

  const applyFilter = (options) => { // filter function to match user input
    return options.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
  };

  const renderOption = (item, index) => ( // render the auto complete component
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

  // initial date
  const [rawDateTime, setRawDateTime] = useState(new Date());
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const navigateToRegister = () => {
    navigation.navigate('Register');
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
    var month = rawDateTime.getMonth() + 1;
    var year = rawDateTime.getFullYear();
    var MonthName =  ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    setDate(date + '-' + MonthName[month] + '-' + year); // update teh date variable
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={styles.card}>
        <ScrollView>
        {/* if isLoading == true, show loading screen */}
        {isLoading==true ? <LoadingSpinner/> : null}
        <Text style={styles.title}>Log your food</Text>
        <Spacer height={20}/>
        <Text style={styles.captionText}>DD-Mon-YY</Text>
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
        <Text style={styles.captionText}>24 hours time system</Text>
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
        <Autocomplete
          style={styles.searchBar}
          placeholder='For example, Nasi Lemak'
          value={query}
          onChangeText={onChangeText}
          onSelect={onSelect}>
          {data.map(renderOption)}
        </Autocomplete>
        <Spacer/>
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
};