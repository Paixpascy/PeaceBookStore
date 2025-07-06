
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'


export const AppContext=createContext()
const getCart=((books)=>{
  let cart={}
  books.forEach((book)=>{
    cart[book._id]=0
  })
   return cart;
})
const AppContextProvider = (props) => {

    const[isLoggedIn,setisLoggedin]=useState(false)
    const[allBooks,setAllBooks]=useState({})
    const[cartData,setCartData]=useState({})

    useEffect(()=>{
        axios.get('http://127.0.0.1:3004/booksRoute/getbooks')
        .then((response)=>{
            setAllBooks(response.data.data)
            setCartData(getCart(response.data.data))
        })
    },[])

    const addToCart=((bkid,desiredQty)=>{
      console.log('our book id is',bkid)
      const book=allBooks.find((e)=>e._id === bkid)
      if(!book){
        toast.error('book not found')
        return;
      }

      const currentQty=cartData[bkid] || 0
      const newQuantity=currentQty + desiredQty
      if(newQuantity <= book.stoke){
        setCartData((prev)=>({...prev,[bkid]:newQuantity}))
        toast.success('product added to cart successfully')
      }else{
        toast.error('product is out of stock')
      }
    })

    const updatedQuantity=((bookId,quantity)=>{
      let cartItem=structuredClone(cartData)
      cartItem[bookId]=quantity
      setCartData(cartItem)
    })

    const totalAmount=()=>{
      if(!allBooks || allBooks.length === 0){
        return 0;
      }
      return allBooks.reduce((acc,books) =>{
        const quantity= cartData?.[books._id] || 0
        return (acc + books.price * quantity)
      },0)
    }

    const deleteFromCart=((bookId)=>{
      setCartData((prev)=>({...prev,[bookId]:0}))
    })

    const clearCart=()=>{
      setCartData({})
    }
    const conntextValue={isLoggedIn,setisLoggedin,allBooks,setAllBooks,addToCart,
      totalAmount,updatedQuantity,deleteFromCart,cartData,clearCart}
  return (
    <div>
      <AppContext.Provider value={conntextValue}>
        {props.children}
      </AppContext.Provider>
    </div>
  )
}

export default AppContextProvider
