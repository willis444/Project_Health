import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import styles from './styles';
import { Layout, Input, Text, Toggle, Button, IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { Spacer, LoadingSpinner } from '../../../custom_components';
import { toastMessage } from '../../../custom_components';
import { setisLoading } from '../../store/app/appSlice'
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from 'react-native-progress/Bar';
import { current } from '@reduxjs/toolkit';

export const viewNutrientReport  = ({ navigation, route }) => {

  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.app.isLoading.payload);

  const gender = useSelector(state => state.app.user_gender);

  // state for date
  const selectedDate = new Date();
  const currentMonth =selectedDate.getMonth(); // get current month
  const calculatedDate = useState([]); // state array to store calculated date
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']; // state array for month
  const [rawStartDate, setRawStartDate] = useState([]); // state array for storing raw start date of a week
  const [rawEndDate, setRawEndDate] = useState([]); // state array for storing raw end date of a week
  const [displayDate, setDisplayDate] = useState([]); // state array for displaying the date in human readible format
  
  // state for selection
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(new IndexPath(currentMonth)); // state for the month selection, by default, current month is pre chosen
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(new IndexPath(0)); // state for the week selection, by default, first one is pre chosen
  const selectedMonth = month[selectedMonthIndex.row]; // state for display selected month in the selection bar
  const selectedWeek = displayDate[selectedWeekIndex.row]; // state for display selected month in the selection bar
  
  // state for nutrient
  const macro = ['calories', 'carbohydrates', 'fat', 'protein'];                    // declare array for macro nutrient
  const macroUnit = ['kcal', 'g', 'g', 'g'];                                        // array for macronutrient units
  const macroRequiredMale = [2440, 366, 65, 62];                                    // array for male required macronutrient
  const macroRequiredFemale = [2000, 300, 55, 55];                                  // array for female required macronutrient
  const [macroEaten, setMacroEaten] = useState([]);                                 // array for eaten macronutrient
  const [macroCalculated, setMacroCalculated] = useState([]);                       // array for calculated macronutrient
  const micro = ['sodium', 'potassium', 'vitaminA', 'vitaminC', 'calcium', 'iron']; // array for micro nutrient
  const microUnit = ['mg', 'mg', 'mcg', 'mg', 'mg', 'mg'];                          // array for micronutrient units
  const microRequiredMale = [1500, 4700, 600, 70, 800, 14];                         // array for male required micronutrient
  const microRequiredFemale = [1500, 4700, 500, 70, 800, 29];                       // array for female required micronutrient
  const [microEaten, setMicroEaten] = useState([]);                                 // array for eaten micronutrient
  const [microCalculated, setMicroCalculated] = useState([]);                       // array for calculated micronutrient

  const navigateToDashboard = () => {
    navigation.navigate('Home');
  }

const RenderMacroNutreint = () => {
  return macro.map((element, index) => 
    <Layout style={styles.cardContainer} level='3'>
      <Layout style={styles.nutrientCard} level='1'>
        <Layout style={styles.subNutrientCard} level='1'>
          <Text style={styles.nutrientText}>{element} {macroEaten[index]}/{gender == 'male'?macroRequiredMale[index]:macroRequiredFemale[index]} ({macroUnit[index]})</Text>
          <Text style = {styles.percentageText}>{(macroCalculated[index]*100).toFixed(2)}%</Text>
        </Layout>
        <Layout style={styles.loadingBarCard} level='1'>
        <ProgressBar progress={macroCalculated[index]} width={360} />
        </Layout>
      </Layout>
    </Layout>
  )
}

const RenderMicroNutreint = () => {
  return micro.map((element, index) => 
    <Layout style={styles.cardContainer} level='3'>
      <Layout style={styles.nutrientCard} level='1'>
      <Layout style={styles.subNutrientCard} level='1'>
          <Text style={styles.nutrientText}>{element} {microEaten[index]}/{gender == 'male'?microRequiredMale[index]:microRequiredFemale[index]} ({microUnit[index]})</Text>
          <Text style = {styles.percentageText}>{(microCalculated[index]*100).toFixed(2)}%</Text>
        </Layout>
        <Layout style={styles.loadingBarCard} level='1'>
        <ProgressBar progress={microCalculated[index]} width={360} />
        </Layout>
      </Layout>
    </Layout>
  )
};

// function to get the total days of a particular month
// total days is also the last day of a month
// https://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript
function getDaysInMonth (year, month) {
  return new Date(year, month+1, 0).getDate();
}

function convertRawDate (rawdate, type) {
  var rawDate = new Date(rawdate);
  if (type == 'end') { // if the date type is end
    rawDate.setDate(rawDate.getDate() - 1)  // minus 1 day from the date for display purpose
  }
  var date = rawDate.getDate(); // get date
  var month = rawDate.getMonth(); // get month
  var year = rawDate.getFullYear(); // get year
  var MonthName =  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", // array for month name
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  var converted = (date + '-' + MonthName[month] + '-' + year); // arrange the date into human readible format
  return converted; // return the date
}

const getDateForSelectedMonth = () => {
  // declaration for year and month operation
  selectedDate.setMonth(selectedMonthIndex.row); // set the date to the selected month
  selectedDate.setDate(1); // set the date of the date into 1
  const year = selectedDate.getFullYear(); // get current year
  const month = selectedDate.getMonth(); // get selected month
  var daysInMonth = getDaysInMonth(year, month); // invoke getDaysInMonth function

  // declaration for start date and end date;
  var start;
  var end;

  var startArray = [];
  var endArray = [];
  var convertedArray = [];

  if (daysInMonth == 28) { // if the total day is 28, means it is february
    for (let i = 1; i<=4; i++) {
      start = new Date (selectedDate); // set the start date
      selectedDate.setDate(selectedDate.getDate() + 7); // + 7 days to the selected date
      end = new Date (selectedDate); // set the end date
      startArray.push(start); // push the start time to the array
      endArray.push(end); // push the end time to the array
      var convertedStart = convertRawDate(start, "start"); // get convert start date
      var convertedEnd = convertRawDate(end, "end"); // get convert start date
      var concated = (convertedStart + ' to ' + convertedEnd); // combine the start and end date
      convertedArray.push(concated); // pusht he concated date into the array
    }
  } else { // else, no special handling needed for other month
      for (let i = 1; i<=5; i++) {
        start = new Date (selectedDate);
        if (i == 5) { // if the current iteration is 5, means it is week 5, which requires special handling as it does not have 7 days
          selectedDate.setDate(daysInMonth + 1); // set the date to the start day of the next month
        } else { // else, for week 1 to week 4, + 7 days to the date
          selectedDate.setDate(selectedDate.getDate() + 7); // + 7 days to the selected date
        }
      end = new Date (selectedDate); // set the end date
      startArray.push(start); // push the start time to the array
      endArray.push(end); // push the end time to the array
      var convertedStart = convertRawDate(start, "start"); // get convert start date
      var convertedEnd = convertRawDate(end, "end"); // get convert start date
      var concated = (convertedStart + ' to ' + convertedEnd); // combine the start and end date
      convertedArray.push(concated); // pusht he concated date into the array
      }
  }

  // copy the element in the array into the global state array
  startArray.forEach(element => {
    setRawStartDate(currentArray => [...currentArray, element]);
  })
  endArray.forEach(element => {
    setRawEndDate(currentArray => [...currentArray, element]);
  })
  convertedArray.forEach(element => {
    setDisplayDate(currentArray => [...currentArray, element]);
  })
};

// function to render option for the select
// https://stackoverflow.com/questions/64301663/how-to-pass-dynamic-array-in-ui-kitten-v5-select
const renderOption = (title) => (
  <SelectItem title={title}/>
);

useEffect(() => { // useeffect is used to make sure the function only runs when selectedMonthIndex changes
  selectedDate.setHours(0,0,0,0); // set selected date into 00:00
  // clear previous state
  setDisplayDate([]);
  setRawStartDate([]);
  setRawEndDate([]);
  getDateForSelectedMonth(); //invoke function
}, [selectedMonthIndex]);

return (
<SafeAreaView style={{ flex: 1 }}>
  <Layout style={styles.mainContainer}>
    {/* if is loading== true, show loading screen */}
    {isLoading==true ? <LoadingSpinner/> : null}  
    <ScrollView style={{flexGrow: 1}}>   
    <Layout style={styles.card}>
    <Text style={styles.title}>Weekly Report</Text>
    </Layout>
    <Spacer/>
    <Text>Select Month</Text>
    <Select
        selectedIndex={selectedMonthIndex}
        value = {selectedMonth}
        onSelect={index => setSelectedMonthIndex(index)}>
        {month.map(renderOption)}
      </Select>
    <Spacer/>
    <Text>Select Month</Text>
    <Select
        selectedIndex={selectedWeekIndex}
        value = {selectedWeek}
        onSelect={index => setSelectedWeekIndex(index)}>
        {displayDate.map(renderOption)}
      </Select>
    <Spacer/>
    <Layout>
    <Spacer/>
    <Layout style={styles.subContainer}>
    <Text style={styles.subTitle}>Macronutrient</Text>
    </Layout>
    {/* {singleServingSize?<RenderMacroNutreintSingle/>:<RenderMacroNutreint/>}  */}
    </Layout>
    <Spacer/>
    <Text style={styles.subTitle}>Micronutrient</Text>
    {/* {singleServingSize?<RenderMicroNutreintSingle/>:<RenderMicroNutreint/>} */}
    <Spacer/>
    </ScrollView>
  </Layout>
</SafeAreaView>
);
};