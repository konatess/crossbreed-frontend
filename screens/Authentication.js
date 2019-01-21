import React, { Component } from 'react'
import { Platform, StatusBar, StyleSheet, View, Image, Text, Button } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { NavigationActions } from "react-navigation";
import * as Expo from 'expo';


export default class AUTHENTICATION extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      authenticating: false
    }
  }

  signIn = async () => {
    try {
      console.log("I am a monkey")
      this.setState({ authenticating: true });
      const result = await Expo.Google.logInAsync({
        iosClientId: "778512270288-qf47t5td929rgm78g61nm6o7hvfecllr.apps.googleusercontent.com",
        androidClientId: "865415366088-6beq1kml9n1j99ghe7ep8ql9kd7lk6va.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      })
      console.log("Result type = ", result.type)
      if (result.type === "success") {
        console.log("Purple Bear")
        this.goToHome(result);
      } else {
        this.setState({ authenticating: false });
        console.log("cancelled")
      }
    } catch (e) {
      this.setState({ authenticating: false });
      console.log("error", e)
    }
  }

  goToHome = (result) => {
    console.log("Red Octopus")
    const navigateHome = NavigationActions.navigate({
      routeName: "GameLobby",
      params: { user: result.user }
    });
    this.props.navigation.dispatch(navigateHome);
  }
  
  render() {
    return (
      <View style={styles.container}>
          {this.state.authenticating ? 
            <Text> Loading Stable... </Text>
            : <LoginPage signIn={this.signIn} />
          }
      </View>
    )
  }
}
// const googleIcon = "./assets/images/signin-button.png"
const LoginPage = props => {
  return (
    <View>
      <Button title="Sign in with Google" onPress={() => props.signIn()} />
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 25
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
})