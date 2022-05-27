import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    mainContainer: {
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center' ,
         paddingHorizontal: 10,
    },
    toggleBarContainer: {
        flex:1,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        top: 20,
        position: 'absolute',
        paddingHorizontal: 5,
    },
    menuIconContainer: {
        flex:1,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        top: 20,
        position: 'absolute',
        paddingHorizontal: 5,
    },
    menuIcon: {
        width: 32,
        height: 32,
      },
    icon: {
        marginLeft: 7,
        marginRight: 7,
        width: 32,
        height: 32,
      },
})