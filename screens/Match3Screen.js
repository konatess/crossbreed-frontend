import React, { Component } from 'react';
import { Alert, BackHandler } from "react-native";
import { Container, Header, Body, Title, Left, Right, Button, Icon, Content, H1, Text } from "native-base";
import { Grid, Row, Col } from "react-native-easy-grid";
import { NavigationActions, StackActions } from 'react-navigation';
import GameBoard from '../components/Match3Game/GameBoard';
import RaceDisplay from "../components/Match3Game/RaceDisplay";
import MyModal from "../components/Modal";
import API from "../utils/API";

let modalMessage = "";

export default class Match3Screen extends Component {
	state = {
		playerScore: 0,
		enemyScore: 0,
		gameEnded: false,
		difficultyLevel: "",
		petInfo: {}
	};

	componentWillMount(){
		const difficultyLevel = this.props.navigation.getParam("difficultyLevel");
		const petInfo = this.props.navigation.getParam("petInfo");
		BackHandler.addEventListener("hardwareBackPress", this.showAlert);
		this.setState({ petInfo: petInfo, difficultyLevel: difficultyLevel });
	}

	updateScore = (newScore) => {
		const [ name, value ] = newScore;
		if(!this.state.gameEnded){
    		this.setState({ [name] : value }, () => {
				if(value >= 100){
					this.endGame(name);
				}
			});
		}
	}
	
	startGame = (difficultyLevel) => {
		let newState = { gameEnded: false, playerScore: 0, enemyScore: 0 };
		if(difficultyLevel){
			newState.difficultyLevel = difficultyLevel;
		}
		this.setState(newState);
	}

	endGame = (name) => {
		let baseXP;
		let winBonusXP;
		let totalXP;
		switch(this.state.difficultyLevel){
			case "easy":
				baseXP = 150;
				break;
			case "normal":
				baseXP = 200;
				break;
			case "hard":
				baseXP = 250;
		}
		if(name === "playerScore"){
			winBonusXP = 300;
			totalXP = baseXP + winBonusXP;
			modalMessage = `You Won! \n ${this.state.petInfo.name} earned ${totalXP} XP!`;
		}
		else{
			totalXP = baseXP;
			modalMessage = `You Lost! \n ${this.state.petInfo.name} earned ${totalXP} XP!`
		}
		this.updateLevel(this.state.petInfo, totalXP);
		this.setState({ gameEnded: true });
	}

	updateLevel = (petInfo, gainedXP) => {
		const { _id, level, experiencePoints } = petInfo;
		const levelObj = { currentLevel: level, currentXP: experiencePoints, gainedXP: gainedXP };
		API.updateLevelAndXP( _id, levelObj)
		.then(res => console.log(res.data))
		.catch(err => console.log(err));
	}

	showAlert = () => {
		Alert.alert(
			"Are you sure?",
			"Returning to the lobby will exit the current game, and your pet will not earn any experience points!",
			[
				{ text: "Cancel", style: 'cancel' },
				{ text: "Return to lobby", onPress: () => this.navigate("GameLobby") }
			]
		)
		return true;
	}

	navigate = (routeName) => {
		this.setState({ gameEnded: false }, () => {
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

  render() {
    return (
		<Container>
        	<Header>
        	  <Left style={{ flex: 1 }}>
        	    <Button transparent onPress={ this.showAlert }>
        	      <Icon name='arrow-back' />
        	      <Text> To Lobby </Text>
        	    </Button>
        	  </Left>
        	  <Body style={{ flex: 1 }}>
        	    <Title>Match 3 Race</Title>
        	  </Body>
			  <Right style={{ flex: 1 }}/>
        	</Header>	
			<Content padder scrollEnabled={false} contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-start", alignItems: "center" }}>
				<RaceDisplay playerScore={ this.state.playerScore } enemyScore={ this.state.enemyScore } petInfo={ this.state.petInfo } />
				<GameBoard gameEnded={ this.state.gameEnded } difficulty={ this.state.difficultyLevel } pet={ this.state.petInfo } playerScore={ this.state.playerScore } enemyScore={ this.state.enemyScore } updateScore={ this.updateScore }/>
				<MyModal visible={ this.state.gameEnded }>
					<Grid style={{ backgroundColor: "rgba(0,0,0,0.8)", justifyContent: "center", alignItems: "center"}}>
						<Row size={ 3 }>
							<H1 style={{ alignSelf: "center", color: "white", textAlign: "center" }}> { modalMessage }</H1>
						</Row>
						<Row size={ 1 }>
							<Button success rounded style={{ alignSelf: "center", margin: 5 }}
								onPress={ () => this.startGame() }
							>
								<Text> Play Again </Text>
							</Button>
						</Row>
						<Row size={ 1 }>
							<Button warning rounded style={{ alignSelf: "center", marginHorizontal: 5 }}
								onPress={ () => this.navigate("GameLobby") }
							> 
								<Text style={{ color: "white" }}> Return to Lobby</Text> 
							</Button>
							<Button danger rounded style={{ alignSelf: "center", marginHorizontal: 5 }}
								onPress={ () => this.navigate("Home") }
							> 
								<Text style={{ color: "white" }}> Return to Stable </Text> 
							</Button>
						</Row>
					</Grid>
				</MyModal>
			</Content>
			
		</Container>
    )
  }
}
