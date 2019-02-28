import React, { Component, Fragment, PureComponent } from 'react'
import { View, FlatList, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import { ListItem, Card, Image, Text, Icon, withBadge, Badge, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import FoodCard from '../Components/FoodCard'

import Carousel, { Pagination } from 'react-native-snap-carousel';


// {/* <BadgedIcon type="ionicon" name="ios-chatbubbles" /> */}

class BadgedIcon extends PureComponent {
    render() {
    // const BadgeIcon = withBadge(this.props.CartLength)(Icon)
    return (
      <View style={{marginRight: 40}}>
        <Icon type="material" name="shopping-cart" color="white" onPress={() => this.props.navigation.navigate("Cart", {CartList: this.props.CartList})}/>
        <Badge
          value={String(this.props.CartList.length)}
          status="success"
          containerStyle={{ position: 'absolute', width: 50,top: -4, right: -30 }}
        />
      </View>
    )
  }
}
const mapState = (state) => {
  return {
    CartList: state.FoodAppReducer.CartList,

  }
}
const ConnectedBadgedIcon = connect(mapState)(BadgedIcon)

class FoodListScreen extends PureComponent {
  static navigationOptions = ({navigation}) =>({
    title: 'Matlistan',
    headerStyle: {
      backgroundColor: '#eb1f07',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        paddingRight: 40,
        width: '100%',
    },
    headerRight: (
      <ConnectedBadgedIcon navigation={navigation}/>
      )
  })
  componentDidMount() {
    // this.props.navigation.popToTop()
    // this.props.navigation.navigate("Fail")
  }
  get spinner() {
    return (
      <View style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"

      }}>
        <ActivityIndicator size={40} color="#eb1f07" />
      </View>
    )
  }
  render() {

    return (
        <View style={{alignItems: "center", height: "100%"}}>
        {this.props.isLoading 
            ? this.spinner
            : <FlatList 
            data={this.props.FoodList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <Carousel
                data={item}
                renderItem={({item, index}) => <FoodCard {...item} removeProductFromCart={this.props.removeProductFromCart} addProductToCart={this.props.addProductToCart}/> }
                sliderWidth={width}
                itemWidth={250}
                layout={'default'} 
                layoutCardOffset={18}
                activeAnimationType="spring"
                activeSlideAlignment="center"
                autoplayDelay={1}
                autoplayInterval={1}/>
            )
            }} 
            containerStyle={{alignItems: "center"}}
            showsHorizontalScrollIndicator={false}
            maxToRenderPerBatch={1}/>
        }
        <Button
          title="Kvitto" 
          icon={{
            name: "receipt",
            size: 24,
            color: "white",
            containerStyle: {
              paddingTop: 2,
              paddingRight: 2
            }
          }}
          onPress={() => this.props.navigation.navigate("Cart", { CartList: this.props.CartList, removeProductFromCart: this.props.removeProductFromCart })}
          containerStyle={{position: "absolute", bottom: 0, width: "100%"}}
          buttonStyle={{backgroundColor: "#eb1f07"}}/>
        </View>
    )
  }
}

let { height, width } = Dimensions.get('window');


// const renderItem = ({item, index}) => {
//   return (
//     <Carousel
//       data={item}
//       renderItem={({item, index}) => <FoodCard {...item}  /> }
//       sliderWidth={width}
//       itemWidth={250}
//       layout={'default'} 
//       layoutCardOffset={18}
//       activeAnimationType="spring"
//       activeSlideAlignment="center"
//       autoplayDelay={1}
//       autoplayInterval={1}/>
//   )
// }


const mapStateToProps = (state) => {
    return {
        FoodList: state.FoodAppReducer.FoodList,
        CartList: state.FoodAppReducer.CartList,
        isLoading: state.FoodAppReducer.FetchingStatus.isLoading 
    }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
      changeLoadingStatus: status => dispatch({type: "TOGGLE", payload: status}),
      addProductToCart: product =>  dispatch({type: "ADD_PRODUCT", product}),
      removeProductFromCart: id => dispatch({type: "REMOVE_PRODUCT", id})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodListScreen)

