import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import styles from './styles';
import { Layout, Input, Text, Toggle, Button } from '@ui-kitten/components';
import { Spacer, LoadingSpinner } from '../../../custom_components';
import { toastMessage } from '../../../custom_components';
import { setisLoading } from '../../store/app/appSlice'
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from 'react-native-progress/Bar';
import { current } from '@reduxjs/toolkit';

export const viewFoodNutrition  = ({ navigation, route }) => {

  const {data, size} = route.params;

  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.app.isLoading.payload);

  const gender = useSelector(state => state.app.user_gender);

  // state for serving size
  const [singleServingSize, toggleSingleServingSize] = useState(false); // state for toggle bar
  const [servingSize, setServingSize] = useState(0.00) // state for storing serving size

  // state for nutrient
  const macro = ['calories', 'carbohydrates', 'fat', 'protein'];                    // declare array for macro nutrient
  const macroUnit = ['kcal', 'g', 'g', 'g'];                                        // array for macronutrient units
  const macroRequiredMale = [2440, 366, 65, 62];                                    // array for male required macronutrient
  const macroRequiredFemale = [2000, 300, 55, 53];                                  // array for female required macronutrient
  const [macroEaten, setMacroEaten] = useState([]);                                 // array for eaten macronutrient
  const [macroEatenSingle, setMacroEatenSingle] = useState([]);                     // array for single serving nutrient
  const [macroCalculatedSingle, setMacroCalculatedSingle] = useState([]);           // array for singlecalculated macronutrient
  const [macroCalculated, setMacroCalculated] = useState([]);                       // array for calculated macronutrient
  const micro = ['sodium', 'potassium', 'vitaminA', 'vitaminC', 'calcium', 'iron']; // array for micro nutrient
  const microUnit = ['mg', 'mg', 'mcg', 'mg', 'mg', 'mg'];                          // array for micronutrient units
  const microRequiredMale = [1500, 4700, 600, 70, 800, 14];                         // array for male required micronutrient
  const microRequiredFemale = [1500, 4700, 500, 70, 800, 29];                       // array for female required micronutrient
  const [microEaten, setMicroEaten] = useState([]);                                 // array for eaten micronutrient
  const [microEatenSingle, setMicroEatenSingle] = useState([]);                     // arrray for single serving nutrient
  const [microCalculatedSingle, setMicroCalculatedSingle] = useState([]);           // array for singlecalculated macronutrient
  const [microCalculated, setMicroCalculated] = useState([]);                       // array for calculated micronutrient

  const navigateToDashboard = () => {
    navigation.navigate('Home');
  }

const RenderMacroNutreintSingle = () => {
  return macro.map((element, index) => 
    <Layout style={styles.cardContainer} level='3'>
      <Layout style={styles.nutrientCard} level='1'>
        <Layout style={styles.subNutrientCard} level='1'>
          <Text style={styles.nutrientText}>{element} {macroEatenSingle[index]}/{gender == 'male'?macroRequiredMale[index]:macroRequiredFemale[index]} ({macroUnit[index]})</Text>
          <Text style = {styles.percentageText}>{(macroCalculatedSingle[index]*100).toFixed(2)}%</Text>
        </Layout>
        <Layout style={styles.loadingBarCard} level='1'>
        <ProgressBar progress={macroCalculatedSingle[index]} width={360} />
        </Layout>
      </Layout>
    </Layout>
  )
}

const RenderMicroNutreintSingle = () => {
  return micro.map((element, index) => 
    <Layout style={styles.cardContainer} level='3'>
      <Layout style={styles.nutrientCard} level='1'>
        <Layout style={styles.subNutrientCard} level='1'>
          <Text style={styles.nutrientText}>{element} {microEatenSingle[index]}/{gender == 'male'?microRequiredMale[index]:microRequiredFemale[index]} ({microUnit[index]})</Text>
          <Text style = {styles.percentageText}>{(microCalculatedSingle[index]*100).toFixed(2)}%</Text>
        </Layout>
        <Layout style={styles.loadingBarCard} level='1'>
        <ProgressBar style={{flex:1}} progress={microCalculatedSingle[index]} width={null} />
        </Layout>
      </Layout>
    </Layout>
  )
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
        <ProgressBar style={{flex:1}} progress={macroCalculated[index]} width={null} />
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
}

const calculateMacroSingle = async() => {
  if (gender == 'male') { // if the gender is male, use the data for male
    macro.forEach((element,index) => { //loop through the macro array
      var raw = data.food_nutrition_info.macronutrient[element]; // declare a temporary value to hold the result from the data
      //var filtered = parseFloat(raw.match(/[\d\.]+/)).toFixed(2); // apply regex to extract the float from the value
      var percent = parseFloat((raw/macroRequiredMale[index]).toFixed(2)); // get the percentage for the loading bar
      setMacroEatenSingle(currentArray => [...currentArray, raw]); // push the filtered value into the state array
      setMacroCalculatedSingle(currentArray => [...currentArray, percent]); // push the percentage into the state array
    })
  } else { // else, use the data for female
    macro.forEach((element,index) => { //loop through the macro array
      var raw = data.food_nutrition_info.macronutrient[element]; // declare a temporary value to hold the result from the data
      //var filtered = Number(raw.match(/[\d\.]+/)).toFixed(2); // apply regex to extract the float from the value
      var percent = Number((raw/macroRequiredFemale[index]).toFixed(2)); // get the percentage for the loading bar
      setMacroEatenSingle(currentArray => [...currentArray, raw]); // push the filtered value into the state array
      setMacroCalculatedSingle(currentArray => [...currentArray, percent]); // push the percentage into the state array
    })
  }
}

const calculateMacro = async() => {
  var multiplier = size; // get serving size from the state
  if (gender == 'male') {
    macro.forEach((element,index) => { //loop through the macro array
      var raw = data.food_nutrition_info.macronutrient[element]; // declare a temporary value to hold the result from the data
      //var filtered = parseFloat(raw.match(/[\d\.]+/)).toFixed(2); // apply regex to extract the float from the value
      var multiplied = parseFloat((raw*multiplier).toFixed(2)); // multiply the nutrient eaten with the serving size
      var percent = parseFloat((raw/macroRequiredMale[index]).toFixed(2))*multiplier; // get the percentage for the loading bar
      setMacroEaten(currentArray => [...currentArray, multiplied]); // push the filtered value into the state array
      setMacroCalculated(currentArray => [...currentArray, percent]); // get the percentage for the loading bar and then push the percentage into the state array
    })
  } else {
    macro.forEach((element,index) => { //loop through the macro array
      var raw = data.food_nutrition_info.macronutrient[element]; // declare a temporary value to hold the result from the data
      //var filtered = parseFloat(raw.match(/[\d\.]+/)).toFixed(2); // apply regex to extract the float from the value
      var multiplied = parseFloat((raw*multiplier).toFixed(2)); // multiply the nutrient eaten with the serving size
      var percent = parseFloat((raw/macroRequiredFemale[index]).toFixed(2))*multiplier; // get the percentage for the loading bar
      setMacroEaten(currentArray => [...currentArray, multiplied]); // push the filtered value into the state array
      setMacroCalculated(currentArray => [...currentArray,percent]); // get the percentage for the loading bar and then push the percentage into the state array
    })
  }
}

const calculateMicroSingle = async() => {
  if (gender == 'male') { // if the gender is male, use the data for male
    micro.forEach((element,index) => { //loop through the macro array
      var raw = data.food_nutrition_info.micronutrient[element]; // declare a temporary value to hold the result from the data
      //var filtered = parseFloat(raw.match(/[\d\.]+/)).toFixed(2); // apply regex to extract the float from the value
      var percent = parseFloat((raw/microRequiredMale[index]).toFixed(2)); // get the percentage for the loading bar
      setMicroEatenSingle(currentArray => [...currentArray, raw]); // push the filtered value into the state array
      setMicroCalculatedSingle(currentArray => [...currentArray, percent]); // get the percentage for the loading bar and then push the percentage into the state array
    })
  } else { // else, use the data for female
    micro.forEach((element,index) => { //loop through the macro array
      var raw = data.food_nutrition_info.micronutrient[element]; // declare a temporary value to hold the result from the data
      //var filtered = parseFloat(raw.match(/[\d\.]+/)).toFixed(2); // apply regex to extract the float from the value
      var percent = parseFloat((raw/microRequiredFemale[index]).toFixed(2)); // get the percentage for the loading bar
      setMicroEatenSingle(currentArray => [...currentArray, raw]); // push the filtered value into the state array
      setMicroCalculatedSingle(currentArray => [...currentArray, percent]); // get the percentage for the loading bar and then push the percentage into the state array
    })
  }
}

const calculateMicro = async() => {
  var multiplier = size; // get serving size from the state
  if (gender == 'male') {
    micro.forEach((element,index) => { //loop through the macro array
      var raw = data.food_nutrition_info.micronutrient[element]; // declare a temporary value to hold the result from the data
      //var filtered = parseFloat(raw.match(/[\d\.]+/)); // apply regex to extract the float from the value
      var multiplied = parseFloat((raw*multiplier).toFixed(2)); // multiply the nutrient eaten with the serving size
      var percent = parseFloat((raw/microRequiredMale[index]).toFixed(2))*multiplier; // get the percentage for the loading bar
      setMicroEaten(currentArray => [...currentArray, multiplied]); // push the filtered value into the state array
      setMicroCalculated(currentArray => [...currentArray, percent]); // get the percentage for the loading bar and then push the percentage into the state array
    })
  } else {
    micro.forEach((element,index) => { //loop through the macro array
      var raw = data.food_nutrition_info.micronutrient[element]; // declare a temporary value to hold the result from the data
      //var filtered = parseFloat(raw.match(/[\d\.]+/)); // apply regex to extract the float from the value
      var multiplied = parseFloat((raw*multiplier).toFixed(2)); // multiply the nutrient eaten with the serving size
      var percent = parseFloat((raw/microRequiredFemale[index]).toFixed(2))*multiplier; // get the percentage for the loading bar
      setMicroEaten(currentArray => [...currentArray, multiplied]); // push the filtered value into the state array
      setMicroCalculated(currentArray => [...currentArray, percent]); // get the percentage for the loading bar and then push the percentage into the state array
    })
  }
}

const onToggle = () => {
  if (singleServingSize) {
    toggleSingleServingSize(false);
  } else {
    toggleSingleServingSize(true);
  }
}

useEffect(async() => { // useeffect is used to make sure the function only runs once
  setServingSize(size);
  calculateMacroSingle();
  calculateMicroSingle();
  calculateMacro();
  calculateMicro();
}, []);

return (
<SafeAreaView style={{ flex: 1 }}>
  <Layout style={styles.mainContainer}>
    {/* if is loading== true, show loading screen */}
    {isLoading==true ? <LoadingSpinner/> : null}  
    <ScrollView style={{flexGrow: 1}}>   
    <Layout style={styles.card}>
    <Text style={styles.title}>Nutrient of</Text>
    <Text style={styles.title}>{data.food_name}</Text>
    <Text>Seving Size: {singleServingSize?"single":servingSize}</Text>
    </Layout>
    <Layout>
    <Spacer/>
    <Layout style={styles.subContainer}>
    <Text style={styles.subTitle}>Macronutrient</Text>
    <Layout style={styles.toggle}>
      <Toggle status= 'warning'
              checked={singleServingSize} 
              onChange={onToggle}>
                Toggle Serving Size
      </Toggle>
    </Layout>
    </Layout>
    {singleServingSize?<RenderMacroNutreintSingle/>:<RenderMacroNutreint/>}
    </Layout>
    <Spacer/>
    <Text style={styles.subTitle}>Micronutrient</Text>
    {singleServingSize?<RenderMicroNutreintSingle/>:<RenderMicroNutreint/>}
    <Spacer/>
    </ScrollView>
  </Layout>
</SafeAreaView>
);
};