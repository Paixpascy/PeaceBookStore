import React from 'react'

const Item = (props) => {
  return (
    <>
    <div className='itemcontainer'>
        <img src={props.picture} alt='book' height='150px'></img>
        <p>name:{props.name}</p>
        <p>author:{props.author}</p>
        <p>category:{props.category}</p>
        <p>price:{props.price}</p>
    </div>
    </>
  )
}

export default Item
