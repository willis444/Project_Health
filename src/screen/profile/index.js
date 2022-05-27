import React, { useEffect } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import styles from './styles';
import { Layout, Input, Text, Toggle, Button } from '@ui-kitten/components';
import { Spacer, LoadingSpinner } from '../../../custom_components';
import { toastMessage } from '../../../custom_components';
import { updateProfile } from '../../../axios/user';
import { setisLoading, 
         retrieveUserProfile,
         setUserGender,
         setIsPork,
         setIsBeef,
         setIsVegetarian,
         setIsSeafood,
          } from '../../store/app/appSlice'
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
  const gender = useSelector(state => state.app.user_gender);
  const isPork = useSelector(state => state.app.isPork);
  const isBeef = useSelector(state => state.app.isBeef);
  const isVegetarian = useSelector(state => state.app.isVegetarian);
  const isSeafood = useSelector(state => state.app.isSeafood);

  // update profile function
  async function updateUserProfile() {
    dispatch(setisLoading(true));
    const user_gender = gender;
    const data = {
        user_gender: user_gender,
        eating_habits: {
          "isPork": isPork,
          "isBeef": isBeef,
          "isVegetarian": isVegetarian,
          "isSeafood": isSeafood,
        }
    }
    const result = await updateProfile(data);
    dispatch(retrieveUserProfile());
    toastMessage(result);
  }

  const cancel = () => {
    navigateToDashboard();
  }

  const onCheckedGender = () => {
    if (gender=="male") {
      dispatch(setUserGender("female"));
    } else {
      dispatch(setUserGender("male"));
    }
  };

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
      <Layout style={{flex:1}}>
        <ScrollView style={{flexGrow: 1}}>
          {/* if is loading== true, show loading screen */}
          {isLoading==true ? <LoadingSpinner/> : null}
        <Layout style={styles.card}>
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
          <Text style={styles.content}>I am a {gender == "male"?"male":"female"}</Text>
          <Spacer/>
          <Toggle style={styles.toggle}
                  status= {gender=='male'?'success':'danger'}
                  checked={gender=='male'?true:false} 
                  onChange={onCheckedGender}>
          </Toggle>
          <Spacer height={20}/>
          <Text style={styles.content}>I am a PORK eater</Text>
          <Spacer/>
          <Toggle style={styles.toggle}
                  status= {isPork?'success':'danger'}
                  checked={isPork} 
                  onChange={onCheckedPork}>
          </Toggle>
          <Spacer height={20}/>
          <Text style={styles.content}>I am a BEEF eater</Text>
          <Spacer/>
          <Toggle style={styles.toggle}
                  status= {isBeef?'success':'danger'}
                  checked={isBeef} 
                  onChange={onCheckedBeef}>
          </Toggle>
          <Spacer height={20}/>
          <Text style={styles.content}>I eat SEAFOOD</Text>
          <Spacer/>
          <Toggle style={styles.toggle}
                  status= {isSeafood?'success':'danger'}
                  checked={isSeafood} 
                  onChange={onCheckedSeafood}>
          </Toggle>
          <Spacer height={20}/>
          <Text style={styles.content}>I am a VEGETARIAN</Text>
          <Spacer/>
          <Toggle style={styles.toggle}
                  status= {isVegetarian?'success':'danger'}
                  checked={isVegetarian} 
                  onChange={onCheckedVegetarian}>
          </Toggle>
        </Layout>
        <Spacer/>
        <Layout style={styles.subCard}>
          <Button onPress={() => updateUserProfile()}>Update Profile</Button>
          <Button onPress={() => cancel()}>Cancel</Button>
        </Layout>
        <Spacer/>
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
};