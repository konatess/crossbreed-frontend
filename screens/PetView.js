import React from 'react';
import API from '../utils/API'

import { StyleSheet, View, TextInput } from 'react-native';
import { Svg } from 'expo';
import { Content, Card, CardItem, Text, Button, Header, Body, Title, Icon } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { NavigationActions } from 'react-navigation';
const { Circle } = Svg;
import SlimePet from "../components/SlimePet";

export default class PetScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = {
            pet: {}
        }
    }

    componentWillMount() {
        const id = this.props.navigation.getParam('pet');
        console.log(id);
        API.getPet(id).then(res => {
            console.log(res.data);
            var thisPet = res.data
            this.setState({
                pet: thisPet
            })
        }).catch(err => {
            console.log(err);
        });
    }

    toGameLobby = (pet) => {
        const navigateToGameLobby = NavigationActions.navigate({
            routeName: "GameLobby",
            params: { pet: pet }
        });
        // Adds 3 seconds to Android devices
        // const reset = StackActions.reset({
        //   index: 0,
        //   actions: [NavigationActions.navigate({ routeName: 'Home' })],
        // });
        // this.props.navigation.dispatch(reset);
        this.props.navigation.dispatch(navigateToGameLobby);
    }

    toBreedPage = (pet) => {
        const navigateToGameLobby = NavigationActions.navigate({
            routeName: "Breed",
            params: { pet: pet }
        });
        // Adds 3 seconds to Android devices
        // const reset = StackActions.reset({
        //   index: 0,
        //   actions: [NavigationActions.navigate({ routeName: 'Home' })],
        // });
        // this.props.navigation.dispatch(reset);
        this.props.navigation.dispatch(navigateToGameLobby);
    }

    render() {
        if (this.state.pet._id) {
            return (
                <Content style={styles.centeredContent} >
                    <Header>
                        <Body>
                            <Title style={{ alignSelf: 'center' }}>{this.state.pet.name}</Title>
                        </Body>
                    </Header>
                    <Card style={styles.centeredContent}>
                        <CardItem>
                            <Body>
                                <View style={styles.svgContainer}>
                                    <SlimePet baseColor={this.state.pet.baseColor} outlineColor={this.state.pet.outlineColor} height="200" width="200" scale="1.65" />
                                </View>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Row size={1}>
                                    <Button success rounded style={{ margin: 10 }}
                                        onPress={() => this.toGameLobby(param)}
                                    >
                                        <Text>Play</Text>
                                    </Button>
                                    <Button warning rounded style={{ margin: 10 }}
                                        onPress={() => this.toBreedPage(param)}
                                    >
                                        <Text>Breed</Text>
                                    </Button>
                                    <Button danger rounded style={{ margin: 10 }}
                                        onPress={() => this.releasePet(pet)}
                                    >
                                        <Text>Release</Text>
                                    </Button>
                                </Row>
                                <Text style={{ alignSelf: "center" }}>Name: {this.state.pet.name}</Text>
                                <Text style={{ alignSelf: "center" }}>Level: {this.state.pet.level}</Text>
                                {this.state.pet.level > 1 && <Text style={{ alignSelf: "center" }}>Primary Game Color: {this.state.pet.gameColor.primary}</Text>}
                                {this.state.pet.level > 9 && <Text style={{ alignSelf: "center" }}>Secondary Game Color: {this.state.pet.gameColor.secondary}</Text>}
                                {this.state.pet.parents && <Text style={{ alignSelf: "center" }}> {this.state.pet.parents.length > 1 ? `Parents: ${this.state.pet.parents[0]}, ${this.state.pet.parents[1]}` : `Parents: THE WILD`}</Text>}
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            );
        }
        else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    nameText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,1)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    centeredContent: {
        alignContent: 'center',
        flex: 1,
    },
    svgContainer: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    }
});