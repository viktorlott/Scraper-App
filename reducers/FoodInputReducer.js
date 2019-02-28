import { combineReducers } from 'redux'
import shortid from 'shortid'

const initialState = {
    FoodInputList: [
        {
            name: 'Mjölk',
            id: "awdf"
        }
    ]
}

function FoodInputList(state=initialState, action) {
    switch (action.type) {
        case "ADD_ITEM":
            return  { FoodInputList: [...state.FoodInputList, { name: action.text[0].toUpperCase() + action.text.slice(1), id: shortid.generate()}] }
        case "REMOVE_ITEM":
            return { FoodInputList: state.FoodInputList.filter((item, index) => {
                return item.id != action.id
            })}
        default:
            return state
    }
}


export default FoodInputList