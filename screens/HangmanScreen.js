import React, { Component } from 'react';
import { Alert, BackHandler, AsyncStorage, StyleSheet } from "react-native";
import { Container, Header, Body, Title, Left, Right, Button, Icon, Content, H2, H3, Text } from "native-base";
import { Grid, Row, Col } from "react-native-easy-grid";
import { NavigationActions, StackActions } from 'react-navigation';
import MyModal from "../components/Modal";
import EndGameModal from "../components/EndGameModal";
import API from "../utils/API";
import Alerts from "../utils/Alerts";
import _ from "lodash";

export default class HangmanScreen extends Component {
    state = {
        petInfo: {},
        difficultyLevel: "",
        gameEnded: false,
		helpModalVisible: false,
		word: ['M', 'A', 'G', 'I', 'C'],
		blanksRemaining: 0,
		blanks: [],
		unguessed: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
		guessedWrong: []
    };

    componentWillMount(){
		const difficultyLevel = this.props.navigation.getParam("difficultyLevel");
		const petInfo = this.props.navigation.getParam("petInfo");
		this.backHandler = BackHandler.addEventListener("hardwareBackPress", this.showAlert);
		// eventually we will need to API call for word, and set it up as well.
		const blanksList = this.state.word.map( () => {
			return "_"
		})
		this.setState({ 
			petInfo: petInfo, 
			difficultyLevel: difficultyLevel, 
			blanksRemaining: this.state.word.length, 
			blanks: blanksList 
		});
	}

    showAlert = () => {
        Alerts.exitGame((() => this.navigate("GameLobby")))
    }

    navigate = (routeName) => {
		this.setState({ gameEnded: false }, () => {
			this.backHandler.remove();
			const navigate = NavigationActions.navigate({
				routeName: routeName });
			const reset = StackActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({ routeName: 'GameLobby' })],
			})
			this.props.navigation.dispatch(reset);
			this.props.navigation.dispatch(navigate);
		})
	}

	playGame = (letter) => {
		let goodGuess = false;
		let newblanksRemaining = this.state.blanksRemaining;
		let newBlanks = this.state.blanks.map((blank, index) => {
			if (this.state.word[index] === letter) {
				goodGuess = true;
				newblanksRemaining--;
				return letter;
			}
			else {
				return blank;
			}
		})
		let newUnguessed = this.state.unguessed.filter((notblank) => {
				return notblank !== letter;
		})
		let newGuessedWrong = goodGuess ? this.state.guessedWrong : _.clone(this.state.guessedWrong).push(letter);
		this.setState({
			blanksRemaining: newblanksRemaining,
			blanks: newBlanks, 
			unguessed: newUnguessed, 
			guessedWrong: newGuessedWrong 
		})
		this.winLose();
	}

	winLose = () => {
		if (this.state.blanksRemaining <= 0) {
			// win
		}
		else if (this.state.guessedWrong.length >= 8) {
			// lose
		}
	}

    render(){
        return(
            <Container>
        	    <Header>
        	      <Left style={{ flex: 1 }}>
        	        <Button transparent onPress={ this.showAlert }>
        	          <Icon name='arrow-back' />
        	          <Text> To Lobby </Text>
        	        </Button>
        	      </Left>
        	      <Body style={{ flex: 1 }}>
        	        <Title>Hangman</Title>
        	      </Body>
			      <Right style={{ flex: 1 }}>
			      	<Button transparent onPress={ () => this.setState({ helpModalVisible: true }) }>
			    		<Icon name='help-circle-outline'/>
			    	</Button>
			      </Right>
        	    </Header>	
                <MyModal visible={ this.state.helpModalVisible }>
					<Grid style={{ backgroundColor: "rgba(0,0,0,0.9)", justifyContent: "center", alignItems: "center"}}>
						<Row size={ 1 } >
							<H2 style={{ alignSelf: "center", color: "white", textAlign: "center" }}>
								Play Hangman with your pet!
							</H2>
						</Row>
						<Row size={ 1 }>
							<Button onPress={ () => this.setState({ helpModalVisible: false }) }>
								<Text>Close</Text>
							</Button>
						</Row>
					</Grid>
				</MyModal>
				<EndGameModal modalMessage={ modalMessage } visible={ this.state.gameEnded } navigateToLobby={ ()=> this.navigate("GameLobby")} startGame={ ()=> this.startGame() } navigateToStable={ ()=> this.navigate("Home")} />
				<View>
					<H3>The Magic Word:</H3>
					<H2>_____</H2>
					<H3>Wrong Letters</H3>
					<Row style={{flex: 1, alignSelf: 'center' }}>
						<Button dark rounded small style={{ alignSelf: 'center', margin: 10 }}
						>
							<Text>A</Text>
						</Button>
					</Row>
					<H3>Unguessed Letters</H3>
					<Row style={{flex: 1, alignSelf: 'center' }}>
						<Button primary rounded small style={{ alignSelf: 'center', margin: 10 }}
							onPress={() => this.confirmEditName()}
						>
							<Text>B</Text>
						</Button>
					</Row>
				</View>
            </Container>
        )
    }
}