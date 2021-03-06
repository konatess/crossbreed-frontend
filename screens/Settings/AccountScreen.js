import React, { Component } from 'react';
import { Image, StyleSheet, View, AsyncStorage, Alert,BackHandler } from 'react-native';
import { Body, Title, Content, Button, Text, Left, Right, Icon, Header, List, ListItem, Container} from "native-base";
import API from "../../utils/API";
// import style from './style';
// import { navigationType } from '../../propTypes';
import { NavigationActions, StackActions } from 'react-navigation';
// import * as Expo from 'expo';


export default class AccountScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  // signOut = async () => {
  //   try {
  //     await GoogleSignin.revokeAccess();
  //     await GoogleSignin.signOut();
  //     this.setState({ user: null }); // Remember to remove the user from your app's state as well
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  logout = () => {
    API.logout()
      .then(() => {
        this.clearAsyncStorage().then(() => {
          const navigateHome = NavigationActions.navigate({
            routeName: "Auth",
          });
          this.props.navigation.dispatch(navigateHome);
        })
      }
      )
      .catch(err => console.log(err));
  }

  clearAsyncStorage = () => {
    return AsyncStorage.removeItem("user");
  }
  showConfirm = () => {
    Alert.alert(
        'Are you sure you want to exit the game?',
        'Your pets will miss you',
        [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Exit', onPress: () => this.logout() },
        ],
        { cancelable: false },
    )
    return true;
}


render() {
  const {navigate} = this.props.navigation;

  return (
    <Container>
      <Header> 
        <Body>
          <Title style={{alignSelf: 'center'}}>Settings</Title>
        </Body>
      </Header>
      <Content>
        <List>
          <ListItem icon onPress={() => navigate('AboutGame')}>
            <Left>
              <Icon name="md-information-circle"/>
            </Left>
            <Body>
              <Text>About the game</Text>
            </Body>
          </ListItem>
          <ListItem icon onPress={() => navigate('AboutUs')}>
            <Left>
              <Icon name="md-browsers"/>
            </Left>
            <Body>
              <Text>About the developers</Text>
            </Body>
          </ListItem>
          <ListItem icon onPress={() => this.showConfirm()}>
            <Left>
              <Icon name="md-nuclear"/>
            </Left>
            <Body>
              <Text>Log Out & Exit</Text>
            </Body>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
}
}















// BEFORE
//   render() {
//     return (
//       <Content>
//         <Header>
//           <Body>
//             {/* <Title style={{ alignSelf: 'center' }}>Setting</Title> */}
//           </Body>
//           <Right>
//             <Button transparent>
//               <Icon name='menu' />
//             </Button>
//           </Right>
//         </Header>
//         <View style={style.listContainer}>
//           <Button block danger onPress={() => this.showConfirm()} >
//             <Text>Log Out</Text>
//           </Button>
//         </View>
//       </Content>
//     )
//   }
// }

