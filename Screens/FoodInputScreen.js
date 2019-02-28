import React, { Component } from 'react'
import { View, FlatList, ActivityIndicator } from 'react-native'
import { Button, Input, ListItem, Text, Header } from 'react-native-elements'
import { connect } from 'react-redux'

import Swipeout from 'react-native-swipeout';

import Icon from 'react-native-vector-icons/FontAwesome';

import styled from 'styled-components'

import { Makiko, Hideo } from 'react-native-textinput-effects';



class FoodInputScreen extends Component {
    state = {
        inputValue: "",
        isFetching: false
    }
    static navigationOptions = {
        title: 'Skapa Matlista',
        headerStyle: {
          backgroundColor: '#eb1f07',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontSize: 16,
            alignSelf: 'center',
            textAlign: 'center',
            width: '100%',
            paddingLeft: 30
        },
        headerRight: (<View></View>)
      };

    renderItem = ({ item }) => (

        <Swipeout right={[
            {
                text: 'Ta bort',
                onPress: () => this.props.removeListItem(item.id),
                type: "delete"
            //   backgroundColor: "#eb1f07"
            }
          ]}>
         <ListItem
            title={item.name}
            bottomDivider
            chevron
            leftIcon={{ name: "done", color: "#eb1f07" }}
         />
        </Swipeout>

    )
    
    onSubmit = () => {
        if(this.state.inputValue === "") return
        this.props.addListItem(this.state.inputValue)
        this.setState({inputValue: ""})
    }

    fetchList = () => {
        if(this.props.isLoading) return
        const FoodInputList = this.props.FoodInputList.map(item => item.name)

        this.props.emptyCartList()
        this.props.emptyFoodList()
        this.props.changeLoadingStatus(true)
        this.props.fetchFoodList(FoodInputList)
        
        setTimeout(() => {
            this.props.navigation.navigate("Details")
        }, 1000)
    }
    render() {
        const { FoodInputList, isLoading } = this.props

        return (
            <Container>
                <Makiko
                    label={'Artikelnamn'}
                    iconClass={Icon}
                    iconName={'shopping-cart'}
                    iconColor={'white'}
                    inputPadding={10}
                    style={{
                        width: 300,
                        backgroundColor: '#eb1f07',
                        borderRadius: 3,
                        marginTop: 30,
                        marginBottom: 20,

                    }}
                    inputStyle={{ color: 'black' }}
                    value={this.state.inputValue}   
                    onChangeText={(text) => { this.setState({inputValue: text})}}
                    onSubmitEditing={this.onSubmit}/> 
                <View style={{width: "100%"}}>
                    <FlatList
                        keyExtractor={(item, index) => index + "12"}
                        data={FoodInputList}
                        renderItem={this.renderItem}
                        key="list"
                        />

                </View>

                <Button
                    loading={isLoading}
                    title={isLoading ? "Hämtar" : "Hämta listan"} 
                    onPress={this.fetchList}
                    disable={isLoading}
                    loadingStyle={{padding: 4}}
                    containerStyle={{position: "absolute", bottom: 0, width: "100%"}}
                    buttonStyle={{backgroundColor: "#eb1f07"}}/>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        FoodInputList: state.FoodInputReducer.FoodInputList,
        Cart: state.FoodAppReducer.CartList,
        FoodList: state.FoodAppReducer.FoodList,
        isLoading: state.FoodAppReducer.FetchingStatus.isLoading
    }
}


const addFoodList = (payload) => {
    return {
        type: "FETCH_NEW_FOODLIST", 
        payload
    }
}


function fetchFoodList(list) {
    return dispatch => {
        fetch("http://msapi.develottment.com", {
            method: "POST",
            body: list.join("\n")
          }).then(raw => raw.json()).then(data => {
              dispatch(addFoodList(data))
              dispatch({type: "TOGGLE", payload: false})
          }).catch(console.log)
    }        
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        addListItem: text => dispatch({type: "ADD_ITEM", text}),
        removeListItem: id => dispatch({type: "REMOVE_ITEM", id}),
        fetchFoodList: list => dispatch(fetchFoodList(list)),
        changeLoadingStatus: status => dispatch({type: "TOGGLE", payload: status}),
        emptyFoodList: list => dispatch(addFoodList([])),
        emptyCartList: list => dispatch({type: "RESET"})

    }
}



export default connect(mapStateToProps, mapDispatchToProps)(FoodInputScreen)


const Container = styled.View`
    width: 100%;
    height: 100%;
    align-items: center;
`

const InputContainer = styled.View`
    width: 100%;
    height: 100;
    maring-top: 20;
`


