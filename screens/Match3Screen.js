import React, { Component } from 'react';
import { Alert, BackHandler, AsyncStorage, StyleSheet, StatusBar } from "react-native";
import { Container, Header, Body, Title, Left, Right, Button, Icon, Content, H2, H3, Text } from "native-base";
import { Grid, Row, Col } from "react-native-easy-grid";
import { NavigationActions, StackActions } from 'react-navigation';
import GameBoard from '../components/Match3Game/GameBoard';
import RaceDisplay from "../components/Match3Game/RaceDisplay";
import MyModal from "../components/Modal";
import EndGameModal from "../components/EndGameModal";
import API from "../utils/API";
import Alerts from "../utils/Alerts";

let modalMessage = "";

export default class Match3Screen extends Component {
	state = {
		playerScore: 0,
		enemyScore: 0,
		gameEnded: false,
		difficultyLevel: "",
		petInfo: {},
		enemyInfo: {},
		helpModalVisible: false
	};

	componentWillMount(){
		const difficultyLevel = this.props.navigation.getParam("difficultyLevel");
		const petInfo = this.props.navigation.getParam("petInfo");
		const enemyInfo = this.randomEnemy();
		this.backHandler = BackHandler.addEventListener("hardwareBackPress", this.showAlert);
		this.setState({ petInfo: petInfo, difficultyLevel: difficultyLevel, enemyInfo: enemyInfo });
	}

	randomColor = () => {
		return Math.floor(Math.random() * 256);
	}

	determineOutlineColor = (color) => {
        //This looks at an existing color and determines if a constrast color should be black or white 
        //The below algorithm comes from the w3c standard for accessibility 
        //First, we convert the rgb value for each color into its contrast value
        const contrasts = [color.red, color.green, color.blue].map(currentColor => {
            let currentContrast = currentColor / 255.0;
            if (currentContrast <= 0.03928) {
                currentContrast = currentContrast / 12.92;
            }
            else {
                currentContrast = Math.pow(((currentContrast + 0.055) / 1.055), 2.4);
            }
            return currentContrast;
        });
        //now we use that contrast to calculate an overall luminosity:
        const luminosity = 0.2126 * contrasts[0] + 0.7152 * contrasts[1] + 0.0722 * contrasts[2];
        if (luminosity > 0.179) {
            //if the luminosity is bright, use black as contrast
            return {
                red: 0,
                green: 0,
                blue: 0,
                transparency: 1
            };
        }
        else { //otherwise, use white as a contrast
            return {
                red: 255,
                green: 255,
                blue: 255,
                transparency: 1
            };
        }
    }

	randomEnemy = () => {
		const enemySlime = {
			baseColor: {
			  blue: this.randomColor(),
			  green: this.randomColor(),
			  red: this.randomColor(),
			  transparency: 1
			}
		  }
		const outlineColor = this.determineOutlineColor(enemySlime.baseColor);
		enemySlime.outlineColor = outlineColor;
		return enemySlime;
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
		let newState = { gameEnded: false, playerScore: 0, enemyScore: 0, enemyInfo: this.randomEnemy() };
		if(difficultyLevel){
			newState.difficultyLevel = difficultyLevel;
		}
		this.setState(newState);
	}

	endGame = (name) => {
		const baseXP = 150;
		let winBonusXP;
		let totalXP;
		if(name === "playerScore"){
			switch(this.state.difficultyLevel){
				case "easy":
					winBonusXP = 50;
					break;
				case "normal":
					winBonusXP = 150;
					break;
				case "hard":
					winBonusXP = 250;
					break;
			}
			totalXP = baseXP + winBonusXP;
		}
		else{
			totalXP = baseXP;
		}
		this.updateLevel(this.state.petInfo, totalXP);
	}

	updateLevel = (petInfo, gainedXP) => {
		const { _id, level, experiencePoints } = petInfo;
		const levelObj = { currentLevel: level, currentXP: experiencePoints, gainedXP: gainedXP };
		API.updateLevelAndXP( _id, levelObj)
		.then(res => {
			AsyncStorage.getItem("user").then( user => {
				user = JSON.parse(user);
				user.pets = user.pets.map( pet => {
					if(pet._id === res.data._id){
						return res.data;
					}
					return pet;
				});
				AsyncStorage.setItem("user", JSON.stringify(user)).then( () => {
					this.modalMessage(level, gainedXP, res.data.level);
					this.setState({ gameEnded: true, petInfo: res.data });
				});
			}).done();
		})
		.catch(err => console.log(err));
	}

	modalMessage = (currentLevel, gainedXP, newLevel) => {
		const petName = this.state.petInfo.name
		modalMessage = this.state.playerScore > this.state.enemyScore 
			? `${petName} won! \n It has earned ${gainedXP} XP!`
			: `${petName} lost! \n It still earned ${gainedXP} XP!`;
		if(currentLevel < newLevel){
			modalMessage += `\n It is now at level ${newLevel}!`;
		}
	}

	showAlert = () => {
		// Alert.alert(
		// 	"Are you sure?",
		// 	"Returning to the lobby will exit the current game, and your pet will not earn any experience points!",
		// 	[
		// 		{ text: "Cancel", style: 'cancel' },
		// 		{ text: "Return to lobby", onPress: () => this.navigate("GameLobby") }
		// 	]
		// )
		// return true;
		return Alerts.exitGame((() => this.navigate("GameLobby")))
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

  render() {
    return (
		<Container>
			<StatusBar hidden />
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
			  <Right style={{ flex: 1 }}>
			  	<Button transparent onPress={ () => this.setState({ helpModalVisible: true }) }>
					<Icon name='help-circle-outline'/>
				</Button>
			  </Right>
        	</Header>	
			<Content padder scrollEnabled={false} contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-start", alignItems: "center" }}>
				<RaceDisplay playerScore={ this.state.playerScore } enemyScore={ this.state.enemyScore } petInfo={ this.state.petInfo } enemyInfo={ this.state.enemyInfo } />
				<GameBoard gameEnded={ this.state.gameEnded } difficulty={ this.state.difficultyLevel } pet={ this.state.petInfo } playerScore={ this.state.playerScore } enemyScore={ this.state.enemyScore } updateScore={ this.updateScore }/>
				{/* <MyModal visible={ this.state.gameEnded } goToLobby={ () => this.navigate("GameLobby") }>
					<Grid style={{ backgroundColor: "rgba(0,0,0,0.8)", justifyContent: "center", alignItems: "center"}}>
						<Row size={ 6 }>
							<H3 style={{ alignSelf: "center", color: "white", textAlign: "center" }}> { modalMessage }</H3>
						</Row>
						<Row size={ 1 }>
							<Button success rounded style={{ alignSelf: "center" }}
								onPress={ () => this.startGame() }
							>
								<Text> Play Again </Text>
							</Button>
						</Row>
						<Row size={ 1 }>
							<Button warning rounded style={{ alignSelf: "center" }}
								onPress={ () => this.navigate("GameLobby") }
							> 
								<Text style={{ color: "white" }}> Return to Lobby</Text> 
							</Button>
						</Row>
						<Row size={ 1 } style={{ paddingBottom: 20 }}>
							<Button danger rounded style={{ alignSelf: "center" }}
								onPress={ () => this.navigate("Home") }
							> 
								<Text style={{ color: "white" }}> Return to Stable </Text> 
							</Button>
						</Row>
					</Grid>
				</MyModal> */}
				<EndGameModal modalMessage={ modalMessage } visible={ this.state.gameEnded } navigateToLobby={ ()=> this.navigate("GameLobby")} startGame={ ()=> this.startGame() } navigateToStable={ ()=> this.navigate("Home")} />
				<MyModal visible={ this.state.helpModalVisible }>
					<Grid style={{ backgroundColor: "rgba(0,0,0,0.9)", justifyContent: "center", alignItems: "center"}}>
						<Row size={ 1 } >
							<H2 style={{ alignSelf: "center", color: "white", textAlign: "center" }}>
								Help your pet in the race!
							</H2>
						</Row>
						<Row size={ 3 } style={{ justifyContent: "flex-start" }}>
							<Col>
								<H3 style={styles.helpText}>
									Swipe in the direction you want to switch the tile. 
								</H3>
								<H3 style={styles.helpText}>
									Match three consecutive tiles to boost your pet! 
								</H3>
								<H3 style={styles.helpText}>
									The opponent will move each time you swipe, so plan your moves carefully!
								</H3>
								<Text style={styles.helpText}>
									Hint: Look out for the color(s) that give your pet a bigger boost!
								</Text>
							</Col>
						</Row>
						<Row size={ 1 }>
							<Button onPress={ () => this.setState({ helpModalVisible: false }) }>
								<Text>Close</Text>
							</Button>
						</Row>
					</Grid>
				</MyModal>
			</Content>
		</Container>
    )
  }
}

const styles = StyleSheet.create({
	helpText: {
		color: "white",
		textAlign: "center",
		margin: 20
	}
});