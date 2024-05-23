
import { ADD_TO_CART,GET_CART, REMOVE_ITEM, PLACE_ORDER, GET_ORDER } from '../actionTypes/cart-action-types';

//add cart action
export const addToCart= (productObj: any)=>{
    return{
        type: ADD_TO_CART,
        productObj
    }
}

//get cart action
export const getCart = ()=>{
    return{
        type: GET_CART        
    }
}

//remove item action
export const removeItem=(id: number)=>{
    return{
        type: REMOVE_ITEM,
        id
    }
}

//place order
export const placeOrder = ()=>{
    return{
        type: PLACE_ORDER        
    }
}

//get order
export const getOrder = ()=>{
    return{
        type: GET_ORDER        
    }
}