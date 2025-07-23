
import React from 'react'
import './Item.css'

const Item = (props) => {
  return (
    <>
    <div className='itemcontainer'>
        <img src={props.picture} alt='book' height='150px'></img>
        <p><b>title</b>:{props.name}</p>
        <p><b>author</b>:{props.author}</p>
        <p><b>category</b>:{props.category}</p>
        <p><b>price</b>:{props.price}</p>
    </div>
    </>
  )
}

export default Item
