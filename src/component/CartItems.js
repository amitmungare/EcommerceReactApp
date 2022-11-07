import React from 'react'
import { useSelector } from 'react-redux'
import Cart from './Cart'
import '../css/cart.css'

const CartItems = () => {
  // use selector hook
  let cartItem = useSelector((state) => state.cart)
  let totalItem = useSelector((state) => state.totalCart)
  let totalPrice = cartItem.reduce((total, item) => {
    return (total += item.price * item.qty)
  }, 0)

  // if cart is empty display cart is empty
  if (cartItem.length === 0) {
    return <h1>Cart is Empty</h1>
  } else {
    return (
      <div className="mainDiv">
        {/* items in cart  */}
        <div className="cartDiv">
          {cartItem.map((item) => (
            <Cart item={item} key={item.id} />
          ))}
        </div>

        {/* total price details  */}
        <div className="priceDetailsDiv">
          <h3 className="">Price Details</h3>

          <div className="space">
            <p>Price({totalItem} item)</p>
            <p>{totalPrice}</p>
          </div>

          <div className="space">
            <p className="">Delivery Charges</p>
            <p className="">Free</p>
          </div>

          <div className="space">
            <h5>Total Amount</h5>
            <h5>{totalPrice}</h5>
          </div>
        </div>
      </div>
    )
  }
}

export default CartItems
