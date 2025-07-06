import React, { useContext } from 'react'
import { AppContext } from '../../../context/AppContext'
import { Link } from 'react-router-dom'

const Cart = () => {
    const {totalAmount,updatedQuantity,deleteFromCart,cartData,allBooks}=useContext(AppContext)
    const totalQuantity=Object.values(cartData || {}).reduce((acc,quantity)=>acc + quantity,0)
    const isEmpty=Object.values(cartData || {}).every((totalBooks)=>totalBooks === 0)

  return (
    isEmpty?(
        <div className='emptycart'>
            <h1>your cart is empty</h1>
        </div>
    ):(
        <>
        <div className='cartcontents'>
            {allBooks.map((books)=>{
                const quantity=cartData?.[books._id] ||0
                if(quantity > 0){
                    return(
                        <div key={books._id}>
                            <div className='cartimage'>
                                <img src={books.picture} alt='' height='150px'/>
                            </div>
                            <div className='cartotherdetails'>
                                <p>name:{books.name}</p>
                                <p>author:{books.author}</p>
                                <p>category:{books.category}</p>
                                <p>price:{books.price}</p>
                                <label>change amount:</label>
                                <input type='number' value={quantity} onChange={(e)=>{
                                    const val=Number(e.target.value)
                                    if(val <=books.stoke || !isNaN(val) || val>=1){
                                        updatedQuantity(books._id,val)
                                    }
                                } }/>
                                <p>total amount:{books.price * quantity}</p>
                            </div>
                            <button onClick={()=>{deleteFromCart(books._id)}}>remove from cart</button>
                        </div>
                    )
                }else return null
            })}
            <div className='cartsummary'>
                <h3>cart summary</h3>
                <p>total items :{totalQuantity}</p>
                <p>total amount:{totalAmount()}</p>
            </div>
            <div className='checkout'>
                <Link to='/placeorder'><button>proceed to checkout</button></Link>
            </div>
        </div>
        </>
    )
  )
}

export default Cart
