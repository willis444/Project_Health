import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, Button } from '@ui-kitten/components';
import { Spacer } from '../../custom_components';
import { useSelector } from 'react-redux';
import { LoadingSpinner } from '../../custom_components';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const DetailsScreen = ({ navigation }) => {
  const token = useSelector(state => state.auth.jwtToken);
  const [isLoading, setIsLoading] = useState(false);
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  const test = async () => {
    //const test = useSelector(state => state.auth.jwtToken);
    console.log(token);
  }

  const toggleLoading = () => {
    if (isLoading) setIsLoading(false);
    else setIsLoading(true);
    console.log(isLoading);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='MyApp' alignment='center' accessoryLeft={BackAction}/>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spacer/>
      <Button style={{ marginVertical: 4 }} onPress={() => test()}>get jwt token</Button>
      <Spacer/>
      {isLoading ? <LoadingSpinner/> : null}
      <Button style={{ marginVertical: 4 }} onPress={() => toggleLoading()}>toggle loading</Button>
      </Layout>

    </SafeAreaView>
  );
};