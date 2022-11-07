import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addProducts } from '../actions/Actions';

const Sort = () => {

  // satte to set if sort is true or not 
  const [flag, setFlag] = useState(false);
  const products = useSelector((state)=>state.products)
  const dispatchSort = useDispatch();
  const dispatchCancel = useDispatch();

  // function to sort products according to price 
  function handleSort(){
    let sortedData = products.sort((a,b)=> a.price-b.price)
    dispatchSort(addProducts([...sortedData]))
    setFlag(true);
  }

  // remove sorting 
  function cancelSort(){
    let products=JSON.parse(window.localStorage.getItem("products"))
    dispatchCancel(addProducts([...products]))
    setFlag(false);
  }


  return (
    
    <div className="sortitemsbtn">
      <span className='sortSpan'>
        {/* sort button */}
      <span onClick={() => handleSort()}> Sort by Price </span>
        {flag && (
          <span>
            <img
              src="./images/crossicon.png"
              alt="error"
              width={"20rem"}
              onClick={() => cancelSort()}
              style={{ cursor: "pointer" }}
            />
          </span>
        )}

      </span>
        
    </div>
    
  )
}

export default Sort