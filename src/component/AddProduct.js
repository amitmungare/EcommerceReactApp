import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProducts } from '../actions/Actions';
import fetchData from '../apicalls/ApiCall';
import { showToastMessage } from '../notification/Notify';
import { ToastContainer } from 'react-toastify';
import '../css/addProduct.css';

// function to add a product 
const AddProduct = () => {

  // product selector hook
  const products = useSelector((state)=> state.products)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // putting data in state 
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbmail] = useState("");
  const [rating, setRating] = useState("");

// api link to the data 
let dataurl = 'https://my-json-server.typicode.com/amitmungare/ecomapi/products'


// function to handle the submit action
function handleSubmit(event){
  event.preventDefault()

  let resp = fetchData(dataurl, {
    body:{
      id:Date.now(),
      title:name,
      price,
      category,
      thumbnail,
      rating,
      description,
      edit:true,
    },
    method:"POST"
  })
  resp.then((data)=>{
    dispatch(addProducts([data, ...products]))
    navigate("/")
  })
  showToastMessage("Added Successful", "success")
  setName("")
  setCategory("")
  setDescription("")
  setRating("")
  setThumbmail("")
  setPrice("")
}

  return (
    <div className="addMainDiv">
      {/* toast to display warning */}
      <ToastContainer />

      {/* form to get the data  */}
      <form className="addForm" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="input"
          placeholder="Descriptions"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          className="input"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          className="input"
          placeholder="category"
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          className="input"
          placeholder="Thumbnail image Url"
          onChange={(e) => setThumbmail(e.target.value)}
        />
        <input
          type="text"
          className="input"
          placeholder="ratings"
          onChange={(e) => setRating(e.target.value)}
        />

        {/* submit button */}
        <button type="submit" className='subtn'>
          Add New Product
        </button>
      </form>
    </div>
  )
}

export default AddProduct