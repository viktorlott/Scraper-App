import { combineReducers } from 'redux'
import shortid from 'shortid'
import exampleList from './exampleList'


function FoodList(state=exampleList, action) {
    switch (action.type) {
        case "FETCH_NEW_FOODLIST": 
            return [...action.payload]
        default:
            return state
    }
}


function removeProductFromList(state, id) {
    const removeIndex = state.map(item => item.id).indexOf(id)
    state.splice(removeIndex, 1)
    return state
}
function CartList(state=[], action) {
    switch (action.type) {
        case "ADD_PRODUCT":
            return [...state, action.product]
        case "REMOVE_PRODUCT":
            return removeProductFromList(state, action.id)
        case "RESET": 
            return []
        default:
            return state
    }
}

function FetchingStatus(state={ isLoading: false }, action) {
    switch(action.type) {
        case "TOGGLE":
            return { isLoading: action.payload }
        default:
            return state
    }
}
function FoodApp(state={}, action) {
    return {
        FoodList: FoodList(state.FoodList, action),
        CartList: CartList(state.CartList, action),
        FetchingStatus: FetchingStatus(state.FetchingStatus, action)
    }
}

export default FoodApp