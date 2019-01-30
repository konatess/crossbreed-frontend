import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';
import _ from "lodash";
import PetCard from '../components/Stable/PetCard';
import EggCard from '../components/Stable/EggCard';
import { Col, Row, Grid } from "react-native-easy-grid";
import { NavigationActions } from 'react-navigation';
import { Content, Container, Header, Body, Button, Title, Text } from 'native-base';
import { throwIfAudioIsDisabled } from 'expo/build/av/Audio/AudioAvailability';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      view: "pets",
      // this will hold all the users's pets
      stalls: [],
      // this will hold all the user's eggs
      eggs: [],
    },
    this.timer;
  }

  componentWillMount(){
    this.grabAsyncStorage();
  }

  componentDidMount(){
    this.props.navigation.addListener(
      'willFocus',
      () => {
        this.setState({stalls: []}, this.grabAsyncStorage);
      }
    );
    this.props.navigation.addListener(
      "willBlur",
      () => {
        clearInterval(this.timer);
      }
    )
  }

  grabAsyncStorage = async () => {
    try {
      // await AsyncStorage.setItem('pets', JSON.stringify(this.state.stalls));
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        // We have data!!
        const userInfo = JSON.parse(value);
        const incubatingEggs = [];
        userInfo.eggs.map( egg => {
          if(egg.lifeStage === "incubating"){
            incubatingEggs.push(egg);
          }
        });
        this.incubatingEggs = incubatingEggs;
        if(this.incubatingEggs.length > 0){
          this.incubationTimer();
        }
        this.setState({ 
          stalls: userInfo.pets,
          eggs: userInfo.eggs,
        });
      }
    } catch (error) {
        // Error retrieving data
        console.log(error);
    }
  }

  incubationTimer = () => {
    clearInterval(this.timer);
    this.timer = setInterval( () => {
      if(this.incubatingEggs.length < 1){
        clearInterval(this.timer);
      }
      this.incubatingEggs.forEach((egg, index) => {
        const now = Date.now();
        if(parseInt(now) >= parseInt(egg.willHatchOn)){
          this.incubatingEggs.splice(index, 1);
          const eggs = _.clone(this.state.eggs);
          eggs.find(i => i._id === egg._id).lifeStage = "readyToHatch";
          this.setState({ eggs: eggs });
        }
      });
    }, 60000)
  }

  petOnPress = (index) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'PetScreen',
      params: { pet: this.state.stalls[index]._id },
    });
    
    this.props.navigation.dispatch(navigateAction);
  }

  eggOnPress = (index) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'EggScreen',
      params: { egg: this.state.eggs[index]._id },
    });
    
    this.props.navigation.dispatch(navigateAction);
  }

  setView = (view) => {
    this.setState({ view: view });
  }

  mapPetsAndEggs = () => {
    const renderArray = [];
    this.state.stalls.map( (stall, index) => {
      renderArray.push( <Col key={stall._id} style={{width: 150, height: 200}} >
        <PetCard key={stall._id} data={stall} press={() => {this.petOnPress(index)}} />
      </Col>)
    });
    if(this.state.eggs.length > 0){
      this.state.eggs.map(( egg, index) => {
        if(egg.lifeStage === "readyToHatch"){
          renderArray.push( <Col key={egg._id} style={{width: 150, height: 200}} > 
            <EggCard key={egg._id} data={egg} lifeStage={egg.lifeStage} press={() => {this.eggOnPress(index)}} />
          </Col>)
        }
        else if(egg.lifeStage === "incubating"){
          const now = Date.now();
          if(parseInt(now) >= parseInt(egg.willHatchOn)){
            renderArray.push( <Col key={egg._id} style={{width: 150, height: 200}} > 
              <EggCard key={egg._id} data={egg} lifeStage="readyToHatch" press={() => {this.eggOnPress(index)}} />
            </Col>)
          }
          else{
            renderArray.push( <Col key={egg._id} style={{width: 150, height: 200}} > 
              <EggCard key={egg._id} data={egg} lifeStage={egg.lifeStage} press={() => {this.eggOnPress(index)}} />
            </Col>)
          }
        }
      })
    }
    return renderArray;
  }

  render() {
    return (
      <Content>
        <Header> 
          <Body>
            <Title style={{alignSelf: 'center'}}>Stable</Title>
          </Body>
        </Header>
        <View style={styles.container}>
          <Grid>
            <Row style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}} >
              <Button info bordered={ this.state.view === "pets" ? false : true } rounded style={{ flex: 1, margin: 10, justifyContent: "center"}}
                  onPress={ () => this.setView("pets") }
              > 
                  <Text>Pets</Text> 
              </Button>
              <Button success bordered={ this.state.view === "eggs" ? false : true } rounded style={{ flex: 1, margin: 10, justifyContent: "center"}}
                  onPress={ () => this.setView("eggs") }
              > 
                  <Text>Eggs</Text> 
              </Button>
            </Row>
          </Grid>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Grid>
              <Row style={{flexWrap: "wrap", justifyContent: 'space-evenly'}} > 
                {this.state.stalls ? (this.state.view === "pets" ? (this.mapPetsAndEggs().map( card => {
                  return card;
                }))
                   : this.state.eggs.length > 0 ? (this.state.eggs.map((egg, index)  => {
                    if(egg.lifeStage === "egg"){
                      return <Col key={egg._id} style={{width: 150, height: 200}} > 
                        <EggCard key={egg._id} data={egg} lifeStage={egg.lifeStage} press={() => {this.eggOnPress(index)}} />
                      </Col>
                    }
                  }) ) 
                  : <Text> No Eggs Here </Text>
                  )
                : <Text> Loading Stable </Text>
                }
              </Row>
            </Grid>
          </ScrollView>

        </View>
      </Content>
    );
  }

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
