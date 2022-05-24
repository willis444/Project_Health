import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import styles from './styles';
import { Layout, Input, Text, Toggle, Button, IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { Spacer, LoadingSpinner } from '../../../custom_components';
import { toastMessage } from '../../../custom_components';
import { setisLoading } from '../../store/app/appSlice'
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from 'react-native-progress/Bar';
import { getLogByDay } from '../../../axios/food';
import { VictoryChart, VictoryAxis, VictoryBar, VictoryTheme, VictoryStack, VictoryLegend } from 'victory-native';

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
  
  // state for data
  const [data, setData] = useState([]);                                             // state for data fetched
  const [run, setRun] = useState(false);                                            // state to determine if the analysis function should run

  // state for nutrient
  const macro = ['calories', 'carbohydrates', 'fat', 'protein'];                        // declare array for macro nutrient
  const macroUnit = ['kcal', 'g', 'g', 'g'];                                            // array for macronutrient units
  const macroRequiredMaleSingle = [2440, 366, 65, 62];                                  // array for male required macronutrient for one day
  const macroRequiredFemaleSingle = [2000, 300, 55, 53];                                // array for female required macronutrient for one day
  const [macroRequiredMale, setMacroRequiredMale] = useState([0, 0, 0, 0]);             // array for male requried macronutrient
  const [macroRequiredFemale, setMacroRequiredFemale] = useState([0, 0, 0, 0]);         // array for female requried macronutrient
  const [macroEaten, setMacroEaten] = useState([0, 0, 0, 0]);                           // array for eaten macronutrient percentage for the progress bar
  const [macroPercent, setMacroPercent] = useState([0, 0, 0, 0]);                       // array for calculated macronutrient
  const micro = ['sodium', 'potassium', 'vitaminA', 'vitaminC', 'calcium', 'iron'];     // array for micro nutrient
  const microUnit = ['mg', 'mg', 'mcg', 'mg', 'mg', 'mg'];                              // array for micronutrient units
  const microRequiredMaleSingle = [1500, 4700, 600, 70, 800, 14];                       // array for male required micronutrient
  const microRequiredFemaleSingle = [1500, 4700, 500, 70, 800, 29];                     // array for female required micronutrient
  const [microRequiredMale, setMicroRequiredMale] = useState([0, 0, 0, 0, 0, 0, 0]);    // array for male requried micronutrient
  const [microRequiredFemale, setMicroRequiredFemale] = useState([0, 0, 0, 0, 0, 0, 0]);// array for male requried micronutrient
  const [microEaten, setMicroEaten] = useState([0, 0, 0, 0, 0, 0]);                     // array for eaten micronutrient
  const [microPercent, setMicroPercent] = useState([0, 0, 0, 0, 0, 0]);                 // array for calculated micronutrient percentage for the progress bar

  // state for eating count
  const [mealsCount, setMealsCount] = useState(0); // array for storing meals count based on total days in the selected week
  const [onTimeCount, setOnTimeCount] = useState([{mealsType: 1, counts: 0}, {mealsType: 2, counts: 0}, {mealsType: 3, counts : 0}]); // array for storing meals on time count
  const [earlyCount, setEarlyCount] = useState([{mealsType: 1, counts: 0}, {mealsType: 2, counts: 0}, {mealsType: 3, counts : 0}]); // array for storing meals early count
  const [lateCount, setLateCount] = useState([{mealsType: 1, counts: 0}, {mealsType: 2, counts: 0}, {mealsType: 3, counts : 0}]); // array for storing meals late count
  const [missedCount, setMissedCount] = useState([{mealsType: 1, counts: 0}, {mealsType: 2, counts: 0}, {mealsType: 3, counts : 0}]); // array for storing missed meals count

  const navigateToDashboard = () => {
    navigation.navigate('Home');
  }

const RenderMacroNutreint = () => {
  return macro.map((element, index) => 
    <Layout style={styles.nutrientCard} level='1'>
      <Layout style={styles.subNutrientCard} level='1'>
        <Text style={styles.nutrientText}>{element} {macroEaten[index]}/{gender == 'male'?macroRequiredMale[index]:macroRequiredFemale[index]} ({macroUnit[index]})</Text>
        <Text style = {styles.percentageText}>{(macroPercent[index]*100).toFixed(2)}%</Text>
      </Layout>
      <Layout style={styles.loadingBarCard} level='1'>
      <ProgressBar progress={macroPercent[index]} width={360} />
      </Layout>
    </Layout>
  )
}

const RenderMicroNutreint = () => {
  return micro.map((element, index) => 
  <Layout style={styles.nutrientCard} level='1'>
    <Layout style={styles.subNutrientCard} level='1'>
        <Text style={styles.nutrientText}>{element} {microEaten[index]}/{gender == 'male'?microRequiredMale[index]:microRequiredFemale[index]} ({microUnit[index]})</Text>
        <Text style = {styles.percentageText}>{(microPercent[index]*100).toFixed(2)}%</Text>
      </Layout>
      <Layout style={styles.loadingBarCard} level='1'>
      <ProgressBar progress={microPercent[index]} width={360} />
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

// function to get the days in between 2 dates
// https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
function getDaysBetween (startDate, Endate) {
  const diffTime = Math.abs(Endate - startDate); // get different time in ms for the 2 dates
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // convert the seconds into days
  return diffDays;
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

  var startArray = ['select'];
  var endArray = ['select'];
  var convertedArray = ['Select Week'];

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
      convertedArray.push(concated); // push the concated date into the array
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

const setRequiredNutrient = (days) => {
  // set required nutrient for macronutrient
  if (gender=='male') {
    let newArr = [...macroRequiredMaleSingle]; // copy the data from the state array
    newArr.forEach((element, index) => { // loop the new array
      newArr[index] = newArr[index] * days; // multiply the required nutrient by days
    })
    setMacroRequiredMale(newArr); // update the state array
  } else {
    let newArr = [...macroRequiredFemaleSingle]; // copy the data from the state array
    newArr.forEach((element, index) => { // loop the new array
      newArr[index] = newArr[index] * days; // multiply the required nutrient by days
    })
    setMacroRequiredFemale(newArr); // update the state array
  }
  // set required nutrient for micronutrient
  if (gender=='male') {
    let newArr = [...microRequiredMaleSingle]; // copy the data from the state array
    newArr.forEach((element, index) => { // loop the new array
      newArr[index] = newArr[index] * days; // multiply the required nutrient by days
    })
    setMicroRequiredMale(newArr);
  } else {
    let newArr = [...microRequiredFemaleSingle]; // copy the data from the state array
    newArr.forEach((element, index) => { // loop the new array
      newArr[index] = newArr[index] * days; // multiply the required nutrient by days
    })
    setMicroRequiredFemale(newArr);
  }
}

const retrieveData = async () => {
  try {
    dispatch(setisLoading(true)); // set is loading to true
    if (selectedWeekIndex.row == 0) { // if the use doesn't select any week, return null
      dispatch(setisLoading(false)); // set is loading to false
      return null;
    } else {
      const startDate = new Date (rawStartDate[selectedWeekIndex-1]); // define start date
      const endDate = new Date (rawEndDate[selectedWeekIndex-1]); // define end date
      const days = getDaysBetween(startDate, endDate); // invoke function to get the days in between 2 dates
      setRequiredNutrient(days); // call the function to set required nutrient
      setMealsCount(days); // set the meals count based on the days between state array
      const result = await getLogByDay(startDate, endDate); // call the api
      if (result != []) { // if data is not null
          result.forEach(element => { // loop the result array 
          setData(currentArray => [...currentArray, element]); // put the element in current loop into the state array
        });
        setRun(true); // after the all the element in the result has been put into the state, set run to true to trigger the analysis function
      } else {
        dispatch(setisLoading(false)); // set is loading to false
        return null;
      };
    }
  } catch (error) { // error handling
    dispatch(setisLoading(false)); // set loading to false
    console.log(error.message);
    toastMessage('Opps, seems like the server is down, please try again later.');
  }
}

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

useEffect(async () => {
  setRun(false); // set run to false
  setData([]); // clear data array
  setMacroPercent([0, 0, 0, 0]); // reset the array state
  setMicroPercent([0, 0, 0, 0, 0, 0]); // reset the array state
  setMacroEaten([0, 0, 0, 0]); // reset the array state
  setMicroEaten([0, 0, 0, 0, 0, 0]); // reset the array state
  await retrieveData(); // call function
}, [selectedWeekIndex]) // runs when selected week index change

const calculateMacroNutrient = () => {
  var size;
    if (data.length != 0) { // check if the state array length is 0
      let newArrMacro = [...macroEaten]; // copy the current macroEaten state array and create a temporary array base on it
      let newArrMicro = [...microEaten]; // copy the current microEatn state array and create a temporary array base on it
      let newArrMacroPercent = [...macroPercent] // copy the current macroPercent state array and create a temporary array base on it
      let newArrMicroPercent = [...microPercent] // copy the current microPercent state array and create a temporary array base on it
        data.forEach((element, index) => { // forEach loop to loop through the data
          element.food_details.forEach(food_data => { // forEach loop to loop through the logged food in the current data
            element.log_serving_size.forEach(serving_count => { // forEach loop to loop through the stored sercing size in current data
              if (food_data._id == serving_count.food_id) { // if the food_id matches
                size = serving_count.size; // retrieve the storing size
              }
            })
            macro.forEach((nutrient_name, index) => { // loop the macro state array
              try {
              var nutrient_value = food_data.food_nutrition_info.macronutrient[nutrient_name]; // get the nutrient based on the nutrient name
              var multiplied = parseFloat((nutrient_value*size).toFixed(2)) // multiply the nutrient value based on the serving size
              var toDouble = parseFloat(multiplied.toFixed(2));   // make it to 2 decimal places
              var percent = parseFloat((toDouble/(gender=='male'?macroRequiredMale[index]:macroRequiredFemale[index])).toFixed(2)); // get percentage for the loading bar
              newArrMacro[index] = (newArrMacro[index] + toDouble); // update the temporary array for nutrient
              newArrMacroPercent[index] = (newArrMacroPercent[index] + percent); // update the temporary array for percentage
              //var percent = parseFloat((multiplied))
              } catch (error) {
                console.log(error);
              }
            })
            micro.forEach((nutrient_name, index) => { // loop the macro state array
              try {
              var nutrient_value = food_data.food_nutrition_info.micronutrient[nutrient_name]; // get the nutrient based on the nutrient name
              var multiplied = parseFloat((nutrient_value*size)); // multiply the nutrient value based on the serving size
              var toDouble = parseFloat(multiplied.toFixed(2));   // make it to 2 decimal places
              var percent = parseFloat((toDouble/(gender=='male'?microRequiredMale[index]:microRequiredFemale[index])).toFixed(2)); // get percentage for the loading bar
              newArrMicro[index] = (newArrMicro[index] + toDouble); // update the temporary array
              newArrMicroPercent[index] = (newArrMicroPercent[index] + percent); // update the temporary array for percentage
              //var percent = parseFloat((multiplied))
              } catch (error) {
                console.log(error);
              }
            })
          })
        })
      setMacroEaten(newArrMacro); // replace the entire state array for macroEaten with the updated data
      setMacroPercent(newArrMacroPercent); // replace the entire state array for macroPercent with the updated data
      setMicroEaten(newArrMicro); // replace the entire state array for microEaten with the updated data
      setMicroPercent(newArrMicroPercent); // replace the entire state array for macroPercent with the updated data
    }
}

const checkTimeBreakfast = (datetime) => {
  const time = new Date(datetime).getHours(); // get breakfast hour
  var start = 7; // define start hour
  var end = 10;  // define end hour
  // check if the time is within the duration
  if (time < start) {
    return 'early';
  } else if (time > end) {
    return 'late';
  } else {
    return 'ontime';
  }
}

const checkTimeLunch = (datetime) => {
  const time = new Date(datetime).getHours(); // get breakfast hour
  var start = 11; // define start hour
  var end = 13;  // define end hour
  // check if the time is within the duration
  if (time < start) { 
    return 'early';
  } else if (time > end) {
    return 'late';
  } else {
    return 'ontime';
  }
}

const checkTimeDinner = (datetime) => {
  const time = new Date(datetime).getHours(); // get breakfast hour
  var start = 18; // define start hour
  var end = 21;  // define end hour
  // check if the time is within the duration
  if (time < start) { 
    return 'early';
  } else if (time > end) {
    return 'late';
  } else {
    return 'ontime';
  }
}

const calculateMealTime = () => {
  var breakfastOnTime = 0;
  var breakfastEarly = 0;
  var breakfastLate = 0;
  var lunchOnTime = 0;
  var lunchEarly = 0;
  var lunchLate = 0;
  var dinnerOnTime = 0;
  var dinnerEarly = 0;
  var dinnerLate = 0;
  data.forEach(element => { // loop the data array
    if (element.log_meal_type == 'Breakfast') {
      var onTime; // declare variable to store the result of check breakfast time
      onTime = checkTimeBreakfast(element.log_datetime) // invoke function to check breakfast time
      // ternary operator to check if the breakfast is ontime, late or early.
      // then increase the count for the respective variable
      {onTime=='ontime'? (breakfastOnTime = breakfastOnTime + 1)
       : onTime=='early'? (breakfastEarly = breakfastEarly + 1)
       : (breakfastLate = breakfastLate + 1)
      }
    } else if (element.log_meal_type == 'Lunch') {
      var onTime; // declare variable to store the result of check breakfast time
      onTime = checkTimeLunch(element.log_datetime) // invoke function to check breakfast time
      // ternary operator to check if the lunch is ontime, late or early.
      // then increase the count for the respective variable
      {onTime=='ontime'? (lunchOnTime = lunchOnTime + 1)
       : onTime=='early'? (lunchEarly = lunchEarly + 1)
       : (lunchLate = lunchLate + 1)
      }
    } else {
      var onTime; // declare variable to store the result of check breakfast time
      onTime = checkTimeDinner(element.log_datetime) // invoke function to check breakfast time
      // ternary operator to check if the dinner is ontime, late or early.
      // then increase the count for the respective variable
      {onTime=='ontime'? (dinnerOnTime = dinnerOnTime + 1)
       : onTime=='early'? (dinnerEarly = dinnerEarly + 1)
       : (dinnerLate = dinnerLate + 1)
      }
    }
  }) // end of for each loop
  var missedBreakfast = mealsCount - (breakfastOnTime + breakfastEarly + breakfastLate); // calculate missed breakfast
  var missedLunch = mealsCount - (lunchOnTime + lunchEarly + lunchOnTime); // calculate missed lunch
  var missedDinner = mealsCount - (dinnerOnTime + dinnerEarly + dinnerLate); // calculate missed dinner
  // declare an array and populate the meals count into it
  // var onTimeArr = [{'mealsType': 'Breakfast', count: breakfastOnTime}, {'mealsType': 'Lunch', count: lunchOnTime}, {'mealsType': 'Dinner', count : dinnerOnTime}];
  // var earlyArr = [{'mealsType': 'Breakfast', count: breakfastEarly}, {'mealsType': 'Lunch', count: lunchEarly}, {'mealsType': 'Dinner', count : dinnerEarly}];
  // var lateArr = [{'mealsType': 'Breakfast', count: breakfastLate}, {'mealsType': 'Lunch', count: lunchLate}, {'mealsType': 'Dinner', count : dinnerLate}];
  // var missedArr = [{'mealsType': 'Breakfast', count: missedBreakfast}, {'mealsType': 'Lunch', count: missedLunch}, {'mealsType': 'Dinner', count : missedDinner}];
  var onTimeArr = [{mealsType: 1, counts: breakfastOnTime}, {mealsType: 2, counts: lunchOnTime}, {mealsType: 3, counts : dinnerOnTime}];
  var earlyArr = [{mealsType: 1, counts: breakfastEarly}, {mealsType: 2, counts: lunchEarly}, {mealsType: 3, counts : dinnerEarly}];
  var lateArr = [{mealsType: 1, counts: breakfastLate}, {mealsType: 2, counts: lunchLate}, {mealsType: 3, counts : dinnerLate}];
  var missedArr = [{mealsType: 1, counts: missedBreakfast}, {mealsType: 2, counts: missedLunch}, {mealsType: 3, counts : missedDinner}];
  // set the array into their respective state
  setOnTimeCount(onTimeArr);
  setEarlyCount(earlyArr);
  setLateCount(lateArr);
  setMissedCount(missedArr);
}

useEffect(() => {
  if (run) {
    calculateMacroNutrient();
    calculateMealTime();
    dispatch(setisLoading(false));
  }
}, [run])

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
    {data.length>0 ? (
    <Layout>
        <Text style={styles.subTitle}>Macronutrient</Text>
        <Layout style={styles.cardContainer} level='3'>
        <RenderMacroNutreint/>
        </Layout>
      <Spacer/>
        <Text style={styles.subTitle}>Micronutrient</Text>
        <Layout style={styles.cardContainer} level='3'>
        <RenderMicroNutreint/>
        </Layout>
      <Spacer/>
      <Text style={styles.subTitle}>Breakfast Time analysis</Text>
      <VictoryChart
        domainPadding={20}
        theme={VictoryTheme.material}
      >
        <VictoryAxis
          tickValues={[1, 2, 3]}
          tickFormat={["Breakfast", "Lunch", "Dinner"]}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={[1,2,3,4,5,6,7]}
        />
        <VictoryStack
        colorScale={["#00ed64", "#f9ce09", "#4cc9ff", "#d01f31"]}
        >
          <VictoryBar
            data={onTimeCount}
            x="mealsType"
            y="counts"
          />
          <VictoryBar
            data={earlyCount}
            x="mealsType"
            y="counts"
          />
          <VictoryBar
            data={lateCount}
            x="mealsType"
            y="counts"
          />
          <VictoryBar
            data={missedCount}
            x="mealsType"
            y="counts"
          />
        </VictoryStack>
      </VictoryChart>
      <Layout style={styles.victoryLegend}>
        <VictoryLegend
            x={50} y={10}
            title="Legend"
            centerTitle
            orientation="horizontal"
            gutter={20}
            style={{ border: { stroke: "black" } }}
            colorScale={["#00ed64", "#f9ce09", "#4cc9ff", "#d01f31"]}
            data={[
              { name: "On Time" }, { name: "Early" }, { name: "Late" }, { name: "Missed"}
            ]}
        />
      </Layout>
    </Layout>
    ) : null}
    <Spacer/>
    </ScrollView>
  </Layout>
</SafeAreaView>
);
};