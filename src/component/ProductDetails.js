import React from 'react'
import { useDispatch } from 'react-redux'
import { addCart, CartItems } from '../actions/Actions';
import {showToastMessage} from "../notification/Notify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BasicRating from "./BasicRating"
import '../css/productDetails.css'

const ProductDetails = ({item}) => {

  const dispatchCart = useDispatch();
  const dispatchTotal = useDispatch();

  // function to add  product to cart
  function handleClick(item){
    if(!item.qty){
      item.qty=1;
      dispatchCart(addCart(item))
      dispatchTotal(CartItems())
      showToastMessage("item added to cart", "success")
    }else{
      dispatchCart(addCart(item))
      dispatchTotal(CartItems())
      showToastMessage("item added to cart", "success")
    }
  }

  return (
    <div>
      
      <div className="mainPDdiv">
        {/* display toast  */}
        <ToastContainer />
        
        {/* image of the product */}
        <img className='pdimg' src={item.thumbnail} alt="error" id="detailAddedImage" />
        
        <div className="pddatadiv">

            {/* name of product  */}
            <h2>{item.title}</h2>

            {/* brand name  */}
            <p className="">{item.brand}</p>
            
            {/* rating  */}
            <span>
              <BasicRating value={item.rating} />
            </span>

            {/* price of product */}
            <p className="">Price: &#8377;{item.price}</p>
             {/* of which category */}
            <p className="">Category: {item.category}</p>
              
            {/* description of the product */}
            <p>{item.description}</p>

            {/* button to add to cart  */}
            <button type="" className="addtocartbtn" onClick={() => handleClick(item)}> Add to Cart</button>

        </div>
      </div>

      {/* display more images  */}
      <div className='moreImagesDiv'>
        <h5>More images</h5>
        <img alt="error" src={item.images[0]}></img>
        <img alt="error" src={item.images[1]}></img>
        <img alt="error" src={item.images[2]}></img>
        <img alt="error" src={item.images[3]}></img>
      </div>
    
    </div>
  )
}

export default ProductDetails