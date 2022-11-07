export const Add_products = "Add_products";
export const Add_cart = "Add_cart";
export const Product_view = "Product_view";
export const Cart_items = "Cart_items";
export const Delete_cart = "Delete_cart";
export const Update_cart = "Update_cart";

// function to add a products
export function addProducts(products){
    return{
        type:Add_products,
        products
    }
}
// function to add a item to cart
export function addCart(cart){
    return{
        type:Add_cart,
        cart
    }
}
// function to view product
export function ProductToView(item){
    return{
        type:Product_view,
        view:item
    }
}
// function to get cart items
export function CartItems(){
    return{
        type:Cart_items
    }
}
// function to update cart
export function updateCart(item){
    return{
        type:Update_cart,
        updateItem:item
    }
}
// function to delete item
export function deleteCart(item){
    return{
        type:Delete_cart,
        item
    }
}