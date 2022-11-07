import React from 'react'
import { useSelector } from 'react-redux'
import Item from './Item';
import Sort from './Sort';

const ItemList = ({}) => {

  const data =useSelector((state)=> state.products);

  if(data.length==0){
    // loading data before fatching from api 
    return (
      <div>Loading...</div>
    )
  }else{
    // display the products 
    return (
      <div className='maindivofpage'>
        <div>
          {/* sort option  */}
          <Sort />
        </div>
        {/* display all products */}
        <div className='itemlistmaindiv'>
          {data.map((item) => (
            <Item item={item} key={item.title} />
          ))}
        </div>
        
      </div>
    )
  }

  
}

export default ItemList