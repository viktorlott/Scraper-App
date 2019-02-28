import React, { PureComponent } from 'react'
import { View, FlatList } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import styled from 'styled-components'

import Swipeout from 'react-native-swipeout';


export default class FoodCartScreen extends PureComponent {
    static navigationOptions = {
        title: 'Kvitto',
        headerStyle: {
            backgroundColor: '#eb1f07',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontSize: 16,
            alignSelf: 'center',
            textAlign: 'center',
            width: '100%',
            paddingRight: 30
        },
        headerRight: (
        <View style={{marginRight: 40}}>
            <Icon type="material" name="receipt" color="white" />
        </View>)
    }

    componentWillMount() {
        this.removeProductFromCart = this.props.navigation.getParam("removeProductFromCart")
    }

    renderItem = ({ item }) => (
        <Swipeout right={[
            {
                text: 'Ta bort',
                onPress: () => this.removeProductFromCart(item.id),
                type: "delete"
            //   backgroundColor: "#eb1f07"
            }
          ]}>
         <ListItem
            title={item.name}
            bottomDivider
            chevron
            key={Math.random() + ""}
            // leftIcon={{ name: "done", color: "#eb1f07" }}
            leftAvatar={{ source: { uri: item.img } }}
            title={item.title}
            subtitle={item.price + ":-"}
         />
        </Swipeout>
    )


    render() {
        const { navigation } = this.props
        const CartList = navigation.getParam("CartList")

        return (
        <Container>
            <ListContainer>
                <FlatList
                    data={CartList}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index + ""}
                    key="FoodCartList"
                    
                />
            </ListContainer>
            <SummaryBox>
                <SummaryText>{(Math.round(CartList.map(item => Number(item.price)).reduce((prev, curr) => prev + curr,0) * 100) / 100) + "Kr"}</SummaryText>
            </SummaryBox>
        </Container>
        )
    }
}

const Container = styled.View`
    width: 100%;
    height: 100%;
`

const ListContainer = styled.View`
    margin-bottom: 100;
`

const SummaryBox = styled.View`
    position: absolute;
    bottom: 0;
    height: 100;
    width: 100%;
    background-color: #eb1f07;
    text-align: center;
    justify-content: center;
`

const SummaryText = styled.Text`
    font-size: 40;
    color: white;
    text-align: center;
    width: 100%;

`