import React, { useEffect } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import styles from './styles';
import { Layout, Input, Text, Toggle, Button } from '@ui-kitten/components';
import { Spacer, LoadingSpinner } from '../../../custom_components';
import { toastMessage } from '../../../custom_components';
import { updateProfile } from '../../../axios/user';
import { setisLoading } from '../../store/app/appSlice'
import { useDispatch, useSelector } from 'react-redux';

export const viewFoodNutrition = ({ navigation, route }) => {

  const data = route.params;
  const size = route.params;

  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.app.isLoading.payload);

  const navigateToDashboard = () => {
    navigation.navigate('Home');
  }

  console.log(data);
  console.log(size);

return (
<SafeAreaView style={{ flex: 1 }}>
  <Layout style={styles.mainContainer}>
  <ScrollView style={{flexGrow: 1}}>
    {/* if is loading== true, show loading screen */}
    {isLoading==true ? <LoadingSpinner/> : null}
    <Layout style={styles.card}>
    <Text style={styles.title}>View Nutrient</Text>
    <Spacer />
    </Layout>
    </ScrollView>
  </Layout>
</SafeAreaView>
);
};