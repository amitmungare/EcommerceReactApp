import React from 'react'
import { useDispatch } from 'react-redux'
import { CartItems, deleteCart, updateCart } from '../actions/Actions';
import '../css/cart.css';

const Cart = ({item}) => {

  // dispatch hook
  const dispatchPlus = useDispatch();
  const dispatchMinus = useDispatch();
  const dispatchTotal = useDispatch();
  const dispatchDelete = useDispatch();

  // function to increase cart item
  function handlePlus(item){
    item.qty+=1;
    dispatchPlus(updateCart(item));
    dispatchTotal(CartItems())
  }

  // function to decrease cart item
  function handleMinus(item){
    if(item.qty>1){
      item.qty -=1;
      dispatchMinus(updateCart(item))
      dispatchTotal(CartItems())
    }
  }

  // function to remove item from cart 
  function handleCancel(item){
    dispatchDelete(deleteCart(item))
    dispatchTotal(CartItems())
  }

  return (
    <div className="cart-div">
      {/* product image */}
      <img className='cartProductDiv' src={item.thumbnail} alt="error" id="card-image "/>

      <div className="cart-item-details">

        <div className='itemDetailsDiv'>
          {/* name of the product  */}
          <p>{item.title}</p>
          {/* price of the product  */}
          <p>Price: &#8377;{item.price} </p>
        </div>


        <div className='rightDetailsDiv'>
          <div className="cartIncDec">

            {/* reduce the item quentity */}
            <img
              src="./images/minusicon.png"
              alt="error"
              width={"30rem"}
              onClick={() => handleMinus(item)}
            />
            {/* quentity */}
            <span className="itemQuenticy">
              {item.qty}
            </span>
            {/* increase quentity */}
            <img
              src="./images/pulsicon.png"
              alt="error"
              width={"30rem"}
              onClick={() => handlePlus(item)}
            />
          </div>
          {/* cancle button remove item from cart  */}
           <button
            type="button"
            className="cancleBtnCart"
            onClick={() => handleCancel(item)}>
            Cancel
          </button>
        </div>


      </div>
    </div>
  )
}

export default Cart