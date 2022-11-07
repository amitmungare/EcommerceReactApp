import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  addCart,
  addProducts,
  CartItems,
  ProductToView,
} from '../actions/Actions'
import fetchData from '../apicalls/ApiCall'
import { showToastMessage } from '../notification/Notify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BasicRating from './BasicRating'
import '../css/itemList.css'

const Item = ({ item }) => {
  // state to manage details of product 
  const [addItem, setAddItem] = useState(true)
  const [title, setTitle] = useState(item.title)
  const [price, setPrice] = useState(item.price)
  const [rating, setRating] = useState(item.rating)
  const [description, setDescription] = useState(item.description)

  const products = useSelector((state) => state.products)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const dispatchCart = useDispatch()
  const dispatchTotal = useDispatch()
  const dispatchProduct = useDispatch()

  // function to direct to the product details page 
  function handleClick(item) {
    dispatch(ProductToView(item))
    navigate(`/productdetails/${item.id}`)
  }

  // function to add item to cart 
  function handleCart(item) {
    if (addItem) {
      item.qty = 1
      dispatchCart(addCart(item))
      dispatchTotal(CartItems())
      setAddItem(false)
      showToastMessage('item added to cart', 'success')
    } else {
      navigate('/cart')
    }
  }

  // function to edit item 
  function handleEdit(item) {
    item.edit = false
    dispatchProduct(addProducts([...products]))
  }

  // function to delete item 
  function handleDeleteProduct(item) {
    // let url = `https://my-json-server.typicode.com/amitmungare/ecomapi/products/${item.id}`
    // let result = fetchData(url, { method: 'DELETE' })

    let i = products.indexOf(item)
    products.splice(i, 1)
    dispatchProduct(addProducts([...products]))
    showToastMessage('item deleted', 'warning')
  }

  // function to cancel the editing
  function handleCancel(item) {
    item.edit = true
    dispatchProduct(addProducts([...products]))
  }

  // function to save the editing 
  function handleSave(item) {
    let url = `https://my-json-server.typicode.com/amitmungare/ecomapi/products/${item.id}`
    let result = fetchData(url, {
      body: {
        ...item,
        title,
        price,
        rating,
        description,
        edit: true,
      },
      method: 'PUT',
    })
    result.then((data) => {
      let i = products.indexOf(item)
      products[i] = data
      dispatchProduct(addProducts([...products]))
      showToastMessage('Edited successfully', 'success')
    })
  }

  return (
    <div className="itemcartdiv">
      <ToastContainer />
      <div className="">
        {/* product image  */}
        <img
          className="tnimg"
          alt='error'
          src={item.thumbnail}
          onClick={() => handleClick(item)}
        />

        <div className="belowimgdata">
          <div className="datadivname">
            {/* if editing is true the allow to edit and show input box  */}
            {item.edit ? (
              <h3>{item.title}</h3>
            ) : (
              <div>
                {/* name of the product */}
                <span>Name: </span>
                <input
                  type="text"
                  value={title}
                  className=""
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </div>
            )}

            {item.edit ? (
              <BasicRating value={item.rating} />
            ) : (
              <div>
                {/* rating of the product */}
                <span>Ratings: </span>
                <input
                  type="number"
                  max={'5'}
                  min={'0'}
                  value={rating}
                  step={'0.5'}
                  onChange={(e) => setRating(e.target.value)}
                />
              </div>
            )}

            {/* price of the product */}
            {item.edit ? (
              <p>Price: &#8377;{item.price}</p>
            ) : (
              <div>
                <span>Price: &#8377; </span>
                <input
                  type="text"
                  value={price}
                  className=""
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </div>
            )}
          </div>

        {/* description of the product */}
        <div className="discriptiondiv">
          {item.edit ? (
            <span>{item.description}</span>
          ) : (
            <div>
              <span>Description: </span>
              <textarea
                value={description}
                id="floatingTextarea"
                style={{ width: '20rem', height: '5rem' }}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          )}
        </div>

        {/* button section  */}
        <div className="productBtnDiv">
          {item.edit ? (
            // button to add to cart 
            <button
              type="button"
              className="addtocartbtn"
              onClick={() => handleCart(item)}
            >
              {addItem ? 'Add to Cart' : 'Go to Cart '}
            </button>
          ) : (
            // button to cancel editing 
            <button
              type="button"
              className="cancleedit"
              onClick={() => handleCancel(item)}
            >
              Cancel
            </button>
          )}

          {item.edit ? (
            <>
              {/* edit option  */}
              <span className="spanicons">
                <img
                  src="./images/editicon.png"
                  alt="error"
                  width={'35rem'}
                  onClick={() => handleEdit(item)}
                />
              </span>
              <span>
                {/* delete option  */}
                <img
                  src="./images/deleteicon.png"
                  alt="error"
                  width={'35rem'}
                  onClick={() => handleDeleteProduct(item)}
                />
              </span>
            </>
          ) : (
            // button to save change 
            <button
              type="button"
              className="saveEdit"
              onClick={() => handleSave(item)}
            >
              Save
            </button>
          )}

        </div>
        </div>
      </div>
    </div>
  )
}

export default Item
