
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
    const[allBooks,setAllBooks]=useState([])
    const[cartData,setCartData]=useState({})
    const[userData,setUserData]=useState()
    const[theme,seTheme]=useState('light')

    useEffect(()=>{
        const userLogin=localStorage.getItem('token')
        if(userLogin){
          setisLoggedin(true)
        }else{
          setisLoggedin(false)
        }
        
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

    const UserInfo=async(id)=>{
      try {
      const token=localStorage.getItem('token')
      const userInfo=localStorage.getItem('userdata')
      const getInfo= await axios.get(`http://127.0.0.1:3004/authRoute/userInfo/${id}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      if(getInfo.status===202){
        setUserData(getInfo.data.data)
        console.log('user data is',getInfo)
        const storedInfo=JSON.parse(userInfo)
        setUserData(storedInfo)
        console.log('parsed data is',storedInfo)
      }
      } catch (error) {
        console.log(`error getting user info due to ${error}`)
      }
    }

    useEffect(()=>{
      const storeData=localStorage.getItem('userdata')
      const data=JSON.parse(storeData)
      setUserData(data)
    },[])

    const handleTheme=()=>{
      seTheme((curr)=>(curr==='light'? 'dark': 'light'))
    }

    useEffect(()=>{
      document.body.className=theme
    },[theme])
    
    const conntextValue={isLoggedIn,setisLoggedin,allBooks,setAllBooks,addToCart,theme,
      totalAmount,updatedQuantity,deleteFromCart,cartData,clearCart,userData,UserInfo,handleTheme}
  return (
    <div>
      <AppContext.Provider value={conntextValue}>
        {props.children}
      </AppContext.Provider>
    </div>
  )
}

export default AppContextProvider
