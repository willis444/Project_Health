import {StyleSheet} from 'react-native';

export default StyleSheet.create({

  boundary: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  title: {
    fontSize:50,
  },
  content: {
    //alignSelf: 'flex-start',
  },
  toggle: {
    //alignSelf: 'flex-start',
  },
  card: {
    flex: 9,
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  subCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly', 
    alignItems: 'center',
    paddingBottom: 50,
  },
});
