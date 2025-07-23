import React, { useContext } from 'react'
import { AppContext } from '../../../context/AppContext'
import { Link } from 'react-router-dom'
import './Cart.css'
import Userlinks from '../../../routes/userroutes/Userlinks'

const Cart = () => {
    const {totalAmount,updatedQuantity,deleteFromCart,cartData,allBooks,isLoggedin}=useContext(AppContext)
    const totalQuantity=Object.values(cartData || {}).reduce((acc,quantity)=>acc + quantity,0)
    const isEmpty=Object.values(cartData || {}).every((totalBooks)=>totalBooks === 0)

  return (
    isEmpty?(
        <div className='emptycart'>
            <Userlinks/>
            <h1>your cart is empty</h1>
        </div>
    ):(
        <>
        <Userlinks/>
        <div className='cartcontents'>
            <div className='cartitems'>
            {allBooks.map((books)=>{
                const quantity=cartData?.[books._id] ||0
                if(quantity > 0){
                    return(
                        <div key={books._id} className='singleitem'>
                            <div className='cartimage'>
                                <img src={books.picture} alt='' height='250px'/>
                            </div>
                            <div className='cartotherdetails'>
                                <p><b>name</b>:{books.name}</p>
                                <p><b>author</b>:{books.author}</p>
                                <p><b>category</b>:{books.category}</p>
                                <p><b>price</b>:{books.price}</p>
                                <label><b>change amount</b>:</label>
                                <input type='number' value={quantity} onChange={(e)=>{
                                    const val=Number(e.target.value)
                                    if(val <=books.stoke || !isNaN(val) || val>=1){
                                        updatedQuantity(books._id,val)
                                    }
                                } }/>
                                <p><b>total amount</b>:{books.price * quantity}</p>
                                <button onClick={()=>{deleteFromCart(books._id)}}>remove from cart</button>
                            </div>
                            
                        </div>
                         
                    )
                    
                }else return null
            })}
           </div>
            <div className='cartsummary'>
                <h3>cart summary</h3>
                <p>total items :{totalQuantity}</p>
                <p>total amount:{totalAmount()}</p>
                <Link to='/placeorder'><button>proceed to checkout</button></Link>
            </div>
        </div>
        </>
    )
  )
}

export default Cart
