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
  registerButton: {
    fontSize:15,
    color: '#3366ff',
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5
  },
  captionText: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "opensans-regular",
    color: "#8F9BB3",
  }
});
