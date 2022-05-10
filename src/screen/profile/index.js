import React, { useState, useEffect } from 'react';
import { SafeAreaView, Platform, View, TouchableWithoutFeedback, Pressable } from 'react-native';
import styles from './styles';
import { Layout, Input, Text, Toggle, Button } from '@ui-kitten/components';
import { Spacer, LoadingSpinner } from '../../../custom_components';
import { toastMessage } from '../../../custom_components';
import { updateProfile } from '../../../axios/user';
import { setisLoading, 
         retrieveUserProfile,
         setIsPork,
         setIsBeef,
         setIsVegetarian,
         setIsSeafood, } from '../../store/app/appSlice'
import { useDispatch, useSelector } from 'react-redux';

export const ProfileScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  useEffect(() => { // use-effect is used to make sure all the action is only runned once
    dispatch(setisLoading(true)); // set app to loading
    dispatch(retrieveUserProfile()); // retrieve user profile
  }, []);

  const isLoading = useSelector(state => state.app.isLoading.payload);

  const navigateToDashboard = () => {
    navigation.navigate('Home');
  }

  // state for text input
  const valueID = useSelector(state => state.app.user_id);
  const valueRole = useSelector(state => state.app.user_role);

  // state for toogle bar
  const isPork = useSelector(state => state.app.isPork);
  const isBeef = useSelector(state => state.app.isBeef);
  const isVegetarian = useSelector(state => state.app.isVegetarian);
  const isSeafood = useSelector(state => state.app.isSeafood);

  // update profile function
  async function updateUserProfile() {
    dispatch(setisLoading(true));
    const data = {
      "isPork": isPork,
      "isBeef": isBeef,
      "isVegetarian": isVegetarian,
      "isSeafood": isSeafood,
    }
    const result = await updateProfile(data);
    dispatch(retrieveUserProfile());
    toastMessage(result);
  }

  const cancel = () => {
    navigateToDashboard();
  }

  // on toogle action
  const onCheckedPork = () => {
    if (isPork) {
      dispatch(setIsPork(false));
    } else {
      dispatch(setIsVegetarian(false));
      dispatch(setIsPork(true));
    }
  };

  const onCheckedBeef = () => {
    if (isBeef) {
      dispatch(setIsBeef(false));
    } else {
      dispatch(setIsVegetarian(false));
      dispatch(setIsBeef(true));
    }
  };

  const onCheckedVegetarian = () => {
    if (isVegetarian) {
      dispatch(setIsVegetarian(false));
    } else {
      dispatch(setIsVegetarian(true));
      dispatch(setIsPork(false));
      dispatch(setIsBeef(false));
      dispatch(setIsSeafood(false));
    }
  };

  const onCheckedSeafood = () => {
    if (isSeafood) {
      dispatch(setIsSeafood(false));
    } else {
      dispatch(setIsVegetarian(false));
      dispatch(setIsSeafood(true));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={styles.card}>
        {/* if is loading== true, show loading screen */}
        {isLoading==true ? <LoadingSpinner/> : null}
        <Text style={styles.title}>Profile</Text>
        <Spacer />
        <Input
          label='User ID'
          value={valueID}
          disabled={true}
          onChangeText={nextValue => setValueID(nextValue)}
        />
        <Spacer height={20}/>
        <Input
          label='User Role'
          value={valueRole}
          disabled={true}
        />
        <Spacer height={20}/>
        <Text style={styles.content}>I am a PORK eater</Text>
        <Spacer/>
        <Toggle style={styles.toggle}
                status= {isPork?'success':'basic'}
                checked={isPork} 
                onChange={onCheckedPork}>
        </Toggle>
        <Spacer height={20}/>
        <Text style={styles.content}>I am a BEEF eater</Text>
        <Spacer/>
        <Toggle style={styles.toggle}
                status= {isBeef?'success':'basic'}
                checked={isBeef} 
                onChange={onCheckedBeef}>
        </Toggle>
        <Spacer height={20}/>
        <Text style={styles.content}>I eat SEAFOOD</Text>
        <Spacer/>
        <Toggle style={styles.toggle}
                status= {isSeafood?'success':'basic'}
                checked={isSeafood} 
                onChange={onCheckedSeafood}>
        </Toggle>
        <Spacer height={20}/>
        <Text style={styles.content}>I am a VEGETARIAN</Text>
        <Spacer/>
        <Toggle style={styles.toggle}
                status= {isVegetarian?'success':'basic'}
                checked={isVegetarian} 
                onChange={onCheckedVegetarian}>
        </Toggle>
      </Layout>
      <Layout style={styles.subCard}>
        <Button onPress={() => updateUserProfile()}>Update Profile</Button>
        <Button onPress={() => cancel()}>Cancel</Button>
      </Layout>
    </SafeAreaView>
  );
};