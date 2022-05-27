import {StyleSheet} from 'react-native';

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
  containerHeader: {
    flexDirection: 'row',

  },
  deleteText: {
    marginLeft: 'auto',
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
  layoutCard: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 10,
  },
  servingContainer: {
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
    
  },
  deleteButton: {
    maxWidth: 30,
  },
});
