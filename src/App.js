
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { addProducts } from './actions/Actions';
import fetchData from './apicalls/ApiCall';
import './App.css';
import AddProduct from './component/AddProduct';
import CartItems from './component/CartItems';
import ItemList from './component/ItemList';
import Navbar from './component/Navbar';
import ProductDetails from './component/ProductDetails';

function App() {

  // selector to display items 
  let itemD = useSelector((state)=> state.itemToDisplay);

  // api link 
  const url = "https://my-json-server.typicode.com/amitmungare/ecomapi/db";

  const dispatch = useDispatch();

  // getting the data 
  useEffect(()=>{
    let response = fetchData(url, {
      method:"GET"
    });

    response.then((data)=>{
      let editedData = data.products.map((item)=>{
        item.edit = true;
        return item;
      });
      window.localStorage.setItem("products", JSON.stringify(editedData));
      let products = JSON.parse(window.localStorage.getItem("products"));
      dispatch(addProducts(products));
    })
    
  })

  return (
    <div className="App">
      {/* using routes to navigate */}
      <BrowserRouter>
        <Navbar/>

        <Routes>
          {/* home route  */}
          <Route path="/" element={<ItemList/>}/>
          {/* add new product route  */}
          <Route path="/addproducts" element={<AddProduct/>}/>

          {/* display product details route  */}
          <Route path={`/productdetails/${itemD.id}`} element={<ProductDetails item={itemD}/>}/>

          {/* route for cart  */}
          <Route path="/cart" element={<CartItems/>}/>

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
