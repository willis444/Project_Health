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
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  buttonDateTime: {
    minWidth: 50,
  },
  buttonDateTimeText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 150,
    minHeight: 45,
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
  mealText: {
    marginLeft: 'auto',
  },
  cardContainer: {
    flex: 1,
    paddingBottom: 15,
  },
  foodCard: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginTop: 15,
    marginHorizontal: 10,
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
