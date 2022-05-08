import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Spinner } from '@ui-kitten/components';

export default LoadingSpinner = () => {

  const styles = StyleSheet.create({
    loadingStyle: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)', 
      alignItems: "center", 
      justifyContent: "center",
      position: 'absolute',
      alignItems: 'center',
    },
  })

  return (
    <View
      style={styles.loadingStyle}>
      <Spinner size="large"/>
    </View>
  );
  
};
