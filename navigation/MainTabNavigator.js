import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import PetScreen from '../screens/PetView';
import Match3Screen from '../screens/Match3Screen';
import GameLobbyScreen from "../screens/GameLobbyScreen";
import AccountScreen from '../screens/AccountScreen';


const HomeStack = createStackNavigator(
{ 
  Home: HomeScreen, 
  PetScreen: PetScreen },
{ initialRouteName: 'Home' }
);

HomeStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home`
          : 'md-home'
      }
    />
  ),
};

const BreedStack = createStackNavigator({
  Breed: LinksScreen,
});

BreedStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='md-git-network'
    />
  ),
};


const Match3Stack = createStackNavigator({
  GameLobby: GameLobbyScreen,
  Match3Game: {
    screen: Match3Screen,
    navigationOptions: {
      gesturesEnabled: false
    }
  }
},{
  headerMode: "none",
  initialRouteName: "GameLobby",
});

Match3Stack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name='logo-game-controller-b'
      />
    ),
  };
};
const AccountStack = createStackNavigator({
  Account: AccountScreen,
});
AccountStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-contact`
          : 'md-contact'
      }
    />
  ),
};


export default createBottomTabNavigator({
  HomeStack,
  BreedStack,
  Match3Stack,
  AccountStack
},
{
  swipeEnabled: true,
  tabBarOptions: {
    showLabel: false,
    style: { height: "10%" },
    activeBackgroundColor: "black",
    inactiveBackgroundColor: "black",
    activeTintColor: "white"
  }
}
)