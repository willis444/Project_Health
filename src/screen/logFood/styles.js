import {StyleSheet} from 'react-native';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default StyleSheet.create({

  boundary: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  scroll: {
    flexGrow: 1,
    
  },
  title: {
    fontSize:50,
    textAlign: 'center'
  },
  subTitle: {
    fontSize:15,
  },
  searchBar: {
    minWidth: 300,
    width: "100%",
  },
  subCard: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  buttonDateTime: {
    width: '40%',
  },
  inputDateTime: {
    width: '60%',
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  captionText: {
    alignSelf: 'flex-start'
  },
  foodContainer: {
    flex: 1,
  },
  foodCard: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginVertical: 8,
    borderRadius: 8,
  },
  foodText: {
    fontSize: 15,
    justifyContent: 'center'
  },
  servingCard: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  servingText: {
    maxWidth: 100,
    justifyContent: 'center',
  },
  servingButton: {
    maxWidth: 30,
  },
  deleteButtonContainer: {
    paddingLeft: 20,
  },
  deleteButton: {
    maxWidth: 30,
  },
});
