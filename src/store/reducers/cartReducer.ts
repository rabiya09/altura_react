import { ADD_TO_CART, GET_CART, REMOVE_ITEM, PLACE_ORDER, GET_ORDER} from '../actionTypes/cart-action-types';

const initState: any = {
    items: [],
    total: 0,
}
const cartReducer= (state = initState,action: any)=>{
    if(action.type === ADD_TO_CART){
        //check if the action id exists in the addedItems
         let index = state.items.findIndex((item: { id: any })=> item.id === action.productObj.id);
         // new item
         if(index != -1) {            
            const newArray = [...state.items]; //making a new array
            newArray[index].qtyInCart = newArray[index].qtyInCart + 1;
            newArray[index].quantity = newArray[index].quantity - 1;
             return {
                ...state, 
                items: newArray,
                total: +state.total + +newArray[index].price 
                }
        } else {
            // existing item in cart
            let newTotal = +state.total + +action.productObj.price 
            const updatedProdObj = action.productObj;
            updatedProdObj['qtyInCart'] = 1;
            updatedProdObj['quantity'] = updatedProdObj['quantity']-1;
            return {
                ...state,
                items: [...state.items, updatedProdObj],
                total: newTotal
            }            
        }
    }
    if(action.type === GET_CART){
        return {
            ...state,
            items: [...state.items],
            total: [...state.total]
        }
    }
   if(action.type === REMOVE_ITEM){
        let itemToRemove= state.items.find((item: { id: any; })=> action.id === item.id);
        let new_items = state.items.filter((item: { id: any; })=> action.id !== item.id);        
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        console.log(itemToRemove)
        return {
            ...state,
            items: new_items,
            total: newTotal
        }
    } 
    if(action.type === PLACE_ORDER){
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return {
            ...state,
            items: [...state.items],
            invoiceDate: `${month}/${date}/${year}`,
            invoiceNumber: 'INV_'+new Date().getTime().toString()
        }
    }
    if(action.type === GET_ORDER){
        return {
            ...state,
            items: [...state.items],
        }
    }   
  else {
    return state
    }    
}

export default cartReducer;