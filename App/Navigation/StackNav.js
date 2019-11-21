import * as screens from '../Screens';
import { createStackNavigator } from 'react-navigation-stack';

const StackNav = createStackNavigator(
  {
    Loading: {
      screen: screens.LoadingScreen,
      navigationOptions: {
        header: null
      },
    },
    Login: {
      screen: screens.LoginScreen,
      navigationOptions: {
        header: null
      },
    },
    Signup: {
      screen: screens.SignupScreen,
      navigationOptions: {
        header: null
      },
    }
  },
  {
    initialRouteName: 'Loading',
  }
);

export default StackNav;