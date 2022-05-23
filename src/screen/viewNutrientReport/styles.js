import {StyleSheet} from 'react-native';

export default StyleSheet.create({

  title: {
    fontSize:30,
  },
  mainContainer: {
    flexGrow: 1, 
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  toggle: {
    marginLeft: 'auto'
  },
  subTitle: {
    fontSize: 18,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  },
  cardContainer: {
    flex: 1,
    paddingBottom: 10,
    borderRadius: 8,
  },
  nutrientCard: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: 5,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  nutrientText: {
    fontSize: 15,
  },
  loadingBarCard: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 7,
    marginBottom: 10,
  },
  percentageText: {
    marginLeft: 'auto',
  },
  subNutrientCard: {
    flexDirection: 'row',
  }
});
