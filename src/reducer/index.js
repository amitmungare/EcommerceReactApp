import { Add_cart, Add_products, Cart_items, Delete_cart, Product_view, Update_cart } from "../actions/Actions";

// initial state 
let initialState = {
    products:[],
    cart:[],
    itemToDisplay:"",
    totalCart:0
}

// reduces
export default function products(state = initialState, actions){

    switch(actions.type){
        case Add_products:
            return{
                ...state,
                products:actions.products
            }
        case Add_cart:
            let flag = state.cart.indexOf(actions.cart)
            if(flag!==-1){
                actions.cart.qty +=1;
                return{
                    ...state
                }
            }else{
                return{
                    ...state,
                    cart:[actions.cart, ...state.cart]
                }
            }
        case Product_view:
            return{
                ...state,
                itemToDisplay:actions.view
            }
        case Cart_items:
            let {cart} =state
            let total = cart.reduce((total, item)=>{
                return (total+=item.qty)
            },0)
            return{
                ...state,
                totalCart: total
            }
        case Update_cart:
            let i = state.cart.indexOf(actions.updateItem);
            let updateCart=null;
            if(i !== -1){
                state.cart[i] = actions.updateItem;
                updateCart=state.cart
            }
            return{
                ...state,
                cart:[...updateCart]
            }
        case Delete_cart:
            let pos = state.cart.indexOf(actions.item)
            state.cart.splice(pos, 1)
            return{
                ...state
            }
        default:
            return state
    }

}
