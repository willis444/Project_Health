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
  }
});
