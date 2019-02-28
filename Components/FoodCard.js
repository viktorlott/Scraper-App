import React, { Component, PureComponent } from 'react'
import { View } from 'react-native'
import { Image, Text, Button, Icon } from 'react-native-elements'
import styled from 'styled-components/native'

import shortid from 'shortid'

const imgSize = 220 

export default class FoodCard extends PureComponent {
  state = {
      quantity: 0,
      id: shortid.generate()
  }
  addProduct = () => {
      this.setState((state)=> ({quantity: state.quantity + 1}))
      const { brand, img, price, title } = this.props
      this.props.addProductToCart({ brand, img, price, title, id: this.state.id})
  }
  removeProduct = () => {
    this.setState((state)=> ({quantity: state.quantity <= 0 ? 0 : state.quantity - 1}))
    this.props.removeProductFromCart(this.state.id)
}
  render() {
    const { brand, img, price, title, addProductToCart, removeProductFromCart } = this.props
    const { quantity } = this.state
    let cutTitle = title.split(" ")
    cutTitle.pop()
    cutTitle = cutTitle.join(" ")
    return (
        <Container>
            <CardBox>
                <FoodImage source={{uri: img}} size={imgSize} style={{width: imgSize, height: imgSize}}/>
                <Brand text={" " + brand + " "} />
                <Title text={cutTitle} />
                <Price text={price} />
                <ReceiptIcon />
                <CartSection>
                    <CartButton title="-" onPress={this.removeProduct} color="#C4C4C4" buttonStyle={{height: 35,backgroundColor: "#C4C4C4", borderRadius: 5}}/>
                    <CartAmount text={quantity}/>
                    <CartButton title="+" onPress={this.addProduct} color="#eb1f07" buttonStyle={{height: 35,backgroundColor: "#eb1f07", borderRadius: 5}}/>
                </CartSection>
            </CardBox>
        </Container>
    )
  }
}


const Container = styled.View`
    border-width: 0;
    shadow-color: rgba(0,0,0,0.6);
    shadow-radius: 10;   
    shadow-opacity: 0; 
    height: 500;    
    margin-bottom: 50;          
`

const CardBox = styled.View`
    position: absolute;
    borderColor: rgba(0,0,0,0.2);
    borderBottomWidth: 3;   
    border-radius: 6;
    width: 100%;
    height: 370;    
    bottom: 0; 
    backgroundColor: #f3f3f3;    
    zIndex: 9;
    alignItems: center;

`


const FoodImage = styled(Image)`
    position: absolute;
    top: -120;
    right: ${(props) => -(props.size / 2)};    
    flex: 1; 
    border-radius: ${(props) => (props.size / 2)};
    zIndex: 10;
`


const Brand = ({text}) => (
    <BrandContainer>
        <Text style={{color: "white", fontWeight: "300", flex: 1}}>{text}</Text>
    </BrandContainer>
)

const BrandContainer = styled.View`
    position: absolute;
    left: -4; 
    bottom: 230; 
    padding-left: 8;
    padding-top: 2;
    padding-bottom: 2;
    padding-right: 4;
    border-radius: 4;
    background-color: #eb1f07; 
    align-items: center; 
    flex: 1;
    zIndex: 10;
`


const ReceiptIcon = () => (
    <View style={{position: "absolute", left: -10, bottom: 176, flex: 1, zIndex: 1}}>
         <Icon
            name='receipt'
            type='material'
            color='#f3f3f3'
            size={64}
            iconStyle={{}}
            containerStyle={{}}>
        </Icon>
    </View>
)



const Title = ({text}) => (
    <View style={{position: "absolute", width: "100%", top: 160, alignItems: "center", justifyItems: "center", flex: 1}}>
        <Text style={{
            width: 120, 
            textAlign: "center",
            fontSize: 12, 
            color: "rgba(0,0,0,0.3)", 
            fontWeight: "700", 
            flex: 1}}>{text}</Text>
    </View>
)


const Price = ({text}) => (
    <View style={{position: "absolute", width: 150, bottom: 80, paddingLeft: 5, paddingRight: 5, alignItems: "center", justifyItems: "center", flex: 1}}>
        <Text style={{textAlign: "left",color: "white",fontSize: 32, color: "rgba(0,0,0,0.3)", fontWeight: "700", flex: 1}}>{text + ":-"}</Text>
    </View>
)

const CartSection = styled.View`
    position: absolute;
    bottom: 10;
    height: 60;
    width: 100%;
    flex: 1;
    align-items: center;
    justify-content: center;
    flex-direction: row;

`

const CartButton = (props) => (
    <Button containerStyle={{width: 50, height: 30, borderRadius: 5}}  {...props}/>
)

const CartAmountContainer = styled.View`
    width: 70;
    height: 36;
    border-radius: 10;
    background-color: white;
    margin-top: 5;
    margin-left: 13;
    margin-right: 13;
    justify-content: center;
    align-items: center;
`
const CartAmount = ({text}) => (
    <CartAmountContainer>
        <Text style={{
            position: "absolute",
            top: 5,
            textAlign: "center",
            fontSize: 14, 
            color: "rgba(0,0,0,0.3)", 
            fontWeight: "700", 
            flex: 1}}>{text} st</Text>
    </CartAmountContainer>
)


