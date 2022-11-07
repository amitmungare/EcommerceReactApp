import { Rating } from '@mui/material'
import React from 'react'

const BasicRating = ({value}) => {
  return (
  //  this is the material UI Rating 
    <Rating
      name="simple-controlled"
      value={value?value:0}
    />
  )
}

export default BasicRating