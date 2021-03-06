import React from 'react';
import API from "../utils/API";
import { View, ScrollView, StyleSheet, AsyncStorage, ImageBackground, StatusBar } from 'react-native';
import PetCard from '../components/Stable/PetCard';
import TinyPetCard from '../components/Stable/TinyPetCard';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Body, Title, Button, Text, Content } from 'native-base';
import { NavigationActions } from 'react-navigation';
import Alerts from "../utils/Alerts";

export default class BreedScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
    }

    state = {
        // holds up to 2 pets to be bred
        tobreed: [],
        // holds all users pets not in tobreed array
        pets: []
    }

    componentWillMount() {
        this.grabAsyncData();
    }

    componentDidMount() {
        this.props.navigation.addListener(
            'willFocus',
            () => {
                this.setState({ pets: [], tobreed: [] }, this.grabAsyncData);
            }
        );
        this.props.navigation.addListener(
            "willBlur",
            () => {
                this.props.navigation.setParams({ "pet": null });
            }
        )
    }

    grabAsyncData = () => {
        // get data from AsyncStorage for continuity between screens
        (async () => {
            try {
                const user = await AsyncStorage.getItem('user');
                if (user !== null) {
                    // We have data!!
                    let userInfo = JSON.parse(user);
                    const petParam = this.props.navigation.getParam("pet");
                    if (petParam) {
                        var otherPetsArray = this.filterPets(petParam, userInfo.pets);
                    }
                    this.setState({ pets: otherPetsArray ? otherPetsArray : userInfo.pets, tobreed: petParam ? [petParam] : [] });
                }
            } catch (error) {
                // Error retrieving data
                return Alerts.singleButtonError("Error", error)
            }
        })()
    }

    filterPets = (pet, petsArray) => {
        // make new array of pets, minus chosen pet
        const newPetsArray = petsArray.filter((onePet) => {
            if (onePet._id !== pet._id) {
                return onePet
            }
        });
        return newPetsArray;
    }

    componentWillReceiveProps = (nextProps) => {
        (async () => {
            const user = await AsyncStorage.getItem("user");
            const userInfo = JSON.parse(user);
            const petsArray = userInfo.pets
            let breedThis = nextProps.navigation.getParam('pet');
            // let otherPets = 
            if (breedThis) {
                const newPets = this.filterPets(breedThis, petsArray);
                this.setState(() => {
                    return {
                        pets: newPets,
                        tobreed: [breedThis]
                    }
                })
            }
        })()

    }

    petOnPress = (index) => {
        if (this.state.tobreed.length < 2) {
            this.setState(state => {
                // get chosen pet
                const newbreeder = state.pets[index];
                // make new array of pets, minus chosen pet
                const newpets = this.filterPets(newbreeder, state.pets)
                // get current tobreed pet, if any
                // this doesn't work without slice, 
                // because React does weird things
                let breeders = state.tobreed.slice(0);
                // add new pet to breed to the array
                breeders.push(newbreeder);
                // return the new arrays to set the new state
                return {
                    tobreed: breeders,
                    pets: newpets
                }
            });
        }
        else {
            return Alerts.singleButtonError("Three's a Crowd", "Unfortunately, your pets do not yet have the technology to combine DNA from more than two pets.")
        }
    }

    breederOnPress = (index) => {
        const removebreeder = this.state.tobreed[index];
        const breedpets = this.state.tobreed.filter((pet, i) => {
            if (i !== index) {
                return pet
            }
        })
        const allpets = this.state.pets.slice(0);
        allpets.push(removebreeder);
        this.setState(() => {
            return {
                tobreed: breedpets,
                pets: allpets
            }
        });
    }

    handleBreedPets = () => {
        if (this.state.tobreed.length < 2) {
            return Alerts.singleButtonError("It Takes Two", "You need to select two pets. Click on a pet below to move it into the breeding area above, then try again.");
        }
        else {
            API.breedPets({
                firstParent: this.state.tobreed[0]._id,
                secondParent: this.state.tobreed[1]._id
            })
                .then((res) => {
                    AsyncStorage.getItem("user").then(user => {
                        user = JSON.parse(user);
                        const nonEggs = user.eggs.filter(egg => {
                            return egg.lifeStage !== "egg";
                        });
                        const stallsTaken = parseInt(user.pets.length) + parseInt(nonEggs.length);
                        user.eggs.push({ _id: res.data._id, createdOn: res.data.createdOn, lifeStage: res.data.lifeStage });
                        AsyncStorage.setItem("user", JSON.stringify(user)).then(() => {
                            const navigate = NavigationActions.navigate({
                                routeName: "EggScreen",
                                params: { egg: res.data._id, stallsTaken: stallsTaken }
                            });
                            this.props.navigation.dispatch(navigate);
                        })
                    })
                })
                .catch(err => Alerts.singleButtonError("Error", "Something went wrong! Please try again!"));
        }
    }

    render() {
        return (
            <Container>
                <StatusBar hidden />
                <ImageBackground style={styles.imgBackground}
                    resizeMode='cover'
                    source={require('../assets/images/background.png')}>
                    <Header  style={{ backgroundColor: "transparent", borderBottomWidth: 0, elevation: 0 }}>
                        <Body>
                            <Title style={{ color: "black", alignSelf: 'center' }}>Breed Pets</Title>
                        </Body>
                    </Header>
                    <Content style={styles.container}>
                        <Grid>
                            <Row style={{ flexWrap: "wrap", justifyContent: 'space-evenly', minHeight: 50 }}>
                                {this.state.tobreed.map((breeder, index) => {
                                    return <Col key={breeder._id} style={{ width: 150 }} >
                                        <PetCard key={index} data={breeder} press={() => { this.breederOnPress(index) }}
                                        />
                                    </Col>
                                })}
                            </Row>
                            <Row style={{ justifyContent: 'center' }}>
                                <Button danger rounded style={{ margin: 10 }}
                                    onPress={() => this.handleBreedPets()}
                                >
                                    <Text>Breed</Text>
                                </Button>
                            </Row>
                        </Grid>
                        <ScrollView style={styles.container}>
                            <Grid>
                                <Row style={{ flexWrap: "wrap", justifyContent: 'space-evenly' }} >
                                    {this.state.pets.map((pet, index) => {
                                        return <Col key={pet._id} style={{ width: 100 }} >
                                            <TinyPetCard key={index} data={pet} press={() => { this.petOnPress(index) }} />
                                        </Col>
                                    })}
                                </Row>
                            </Grid>
                        </ScrollView>
                    </Content>
                </ImageBackground>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
    },
    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1 
    },
});
