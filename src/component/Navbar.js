import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import '../css/navbar.css'

const Navbar = () => {
  const nav = useNavigate()
  let total = useSelector((state) => state.totalCart)

  return (
    <div className='navMain'>

      <div className='navLeftDiv'>
        {/* website logo  */}
        <Link to="/" href="#"><img className='logoimg' src='./images/logoecom.png'></img></Link>

        {/* products button */}
        <Link className='productslink' to="/" href="#">Products </Link>

        {/* button to add a new product */}
        <Link className='addtocartlink' to="/addproducts"> Add a product</Link>
      </div>


      <div className='navRightDiv'>
        {/* cart icon  */}
        <img
          className='cartImg'
          src="./images/iconCart.png"
          alt="error"
          width={'40rem'}
          onClick={() => nav('/cart')}
          style={{ cursor: 'pointer' }}
        />
        {/* items in cart  */}
        {total ? (
          <p className='ptotal'> {total} </p>
        ) : (
          ''
        )}
        {/* my github profile link  */}
        <a href='https://github.com/amitmungare'>
          <img
          className='accountImg'
          src="./images/iconAccount.png"
          alt="error"
          width={'40rem'}
          />
        </a>
      </div>
    </div>
  )
}

export default Navbar
