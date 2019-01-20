import React, { Component } from 'react';
import { WebView, Text, View, ScrollView } from 'react-native';
import { Container, Content, Header } from "native-base";
import API from "../utils/API";
import PetCard from '../components/PetCard';


export default class MyFavorite extends Component {

    state ={
        pets: []
    }

    componentDidMount(){

        API.getUser()
        .then(res => {
            this.getPets(res.data.user._id)
        })
    }

    getPets = (id) => {
        API.getUserPets(id)
        .then(res => this.setState({pets: res.data.pet}))
    }

  render() {
    return (
      <Container>
          <Content>
          <ScrollView>

              {this.state.pets.map(book => {
                  return (
                      <PetCard key={pet.id} data={pet}/>
                  )
              })}

          </ScrollView>
          </Content>
      </Container>
    )
  }
}
