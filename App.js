import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import SwitchNav from './App/Navigation';
import { StackNav, DrawerNav } from './App/Navigation';


const SwitchNav = createSwitchNavigator(
  {
    AuthNav: {
      screen: StackNav,
      navigationOptions: {
       header: null
      }
    },
    MainApp: {
      screen: DrawerNav,
      navigationOptions: {
        header: null
      }
    },
  },
  {
    initialRouteName: 'AuthNav',
  }
);


const AppContainer = createAppContainer(SwitchNav);


export default class App extends React.Component {


  constructor(props) {
    super(props);
  }


  render() {   
    return <AppContainer />
  }

}

