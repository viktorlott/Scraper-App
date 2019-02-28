import React from 'react';
import { StyleSheet, View, TextInput, SafeAreaView, StatusBar, Image } from 'react-native';
import { ThemeProvider, Text, Button, Divider, Header, Input, Card, Overlay } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import MaxiLogo from './assets/newMaxi.png'

import Carousel from 'react-native-snap-carousel';

import { Provider } from 'react-redux'
import { combineReducers, createStore, applyMiddleware } from 'redux'

import FoodInputReducer from './reducers/FoodInputReducer'
import FoodApp from './reducers/FoodListReducer'


// import axiosMiddleware from 'redux-axios-middleware'

import axios from 'axios';
import thunk from 'redux-thunk'

import FoodInputScreen from './Screens/FoodInputScreen'
import FoodListScreen from './Screens/FoodListScreen'
import FoodCartScreen from './Screens/FoodCartScreen'
import FailScreen from './Screens/FailScreen'

// const client = axios.create({ //all axios can be used, shown in axios documentation
//   baseURL:'http://msapi.develottment.com/',
//   responseType: 'json'
// });


import { createStackNavigator, createAppContainer, createBottomTabNavigator} from "react-navigation";


const AppNavigator = createStackNavigator(
  {
    Home: FoodInputScreen,
    Details: FoodListScreen,
    Cart: FoodCartScreen,
    Fail: FailScreen
  },
  {
    initialRouteName: "Home"
  }
);


const AppContainer = createAppContainer(AppNavigator);


const reducers = combineReducers({
  FoodInputReducer,
  FoodAppReducer: FoodApp
})

const store = createStore(
  reducers, 
  applyMiddleware(thunk)
)

export default class App extends React.Component {
  state = {
    overlay: false
  }
  renderBackground = () => (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Image source={MaxiLogo} resizeMode="cover" style={{width: "100%", height: 200}}/>
    </View>
  )
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <SafeAreaView style={[styles.container, { backgroundColor: '#eb1f07' }]}>
            <StatusBar barStyle="light-content" backgroundColor="#eb1f07" translucent={false} />
            <AppContainer />
          </SafeAreaView>
        </View>
      </Provider>
    )
  }
}

// {/* <ThemeProvider theme={theme}>
//   <View style={{ height: "100%"}}>
//       <ParallaxScrollView
//         parallaxHeaderHeight={200}
//         renderBackground={this.renderBackground}>
//           <View style={{ height: "100%" }}>
//             <FoodInputView/>
//           </View>
//       </ParallaxScrollView>
//       <CreateListButton />
//   </View>
// </ThemeProvider> */}

const Title = (props) => (
  <View style={{alignItems: "center", margin: 40}}>
    <Text style={styles.title}>{props.text}</Text>
  </View>
)


const CreateListButton = (props) => (
    <View style={{
      position: "absolute",
      bottom: 0,
      zIndex: 10,
      width: 100,
      height: 100,
      justifyContent: 'center',
    }}>
          <ActionButton buttonColor="rgba(231,76,60,1)">
            <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
              <Icon name="md-create" style={styles.actionButtonIcon} />
            </ActionButton.Item>

          </ActionButton>
    </View>
)


const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  container: {
    backgroundColor: "#ffffff",
    height: "100%"
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  backColor: {
    backgroundColor: "#ffffff",
  },
  title: {
    color: "#1e1e1e",
    fontSize: 24,
    fontWeight: "800"
  }
});

