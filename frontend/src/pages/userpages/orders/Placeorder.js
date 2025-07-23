
import React, { useContext, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Placeorder.css'
import Userlinks from '../../../routes/userroutes/Userlinks'
const Placeorder = () => {
  const{cartData,clearCart,allBooks,setAllBooks,isLoggedIn}=useContext(AppContext)
  console.log('logged in',isLoggedIn)
  const[payment,setPayment]=useState('')
  const [ordererDetails,setOrdererDetails]=useState({
    name:'', email:'',country:'',state:'',city:'',zipcode:'',phoneNumber:''
  })

  const handleDetails=(e)=>{
    setOrdererDetails({...ordererDetails,[e.target.name]:e.target.value})
  }

  const token=localStorage.getItem('token')
  const checkOut=async(e)=>{
    e.preventDefault()
    //setPayment('stripe')
    try {

      const booksOrdered=Object.keys(cartData).filter((bkId)=>cartData[bkId] >0).map((bkId)=>{
        const iteminfo=allBooks.find((book)=>book._id === bkId)
        if(!iteminfo){
          return null
        };
        return bkId? {iteminfo,quantity:Number(cartData[bkId])} :null
      }).filter(Boolean)

      if(booksOrdered.length === 0){
        toast.error('your cart is empty')
        return;
      }

      const { name, email, phoneNumber, country, state, city, zipcode } = ordererDetails
      if(!country|| !state|| !city|| !zipcode|| !name|| !email|| !phoneNumber  ){
        toast.error('please fill in all the fields')
      }
      const address={country,state,city,zipcode}
      const orderDetails={
        address,payment,items:booksOrdered,...ordererDetails
      }

      if(payment==='stripe'){
        const response=await axios.post('http://127.0.0.1:3004/ordersRoute/stripePaymnet',orderDetails,{
        headers:{
          Authorization:`bearer ${token}`
        }
      })
      
        if(response && response.data){
        
        setAllBooks((prev)=>(
          prev.map((bk)=>{
            const bksOredred=booksOrdered.find((book)=>
              book.iteminfo._id === bk._id
            )
            if(bksOredred){
              return {...bk, stoke: bk.stoke - bksOredred.quantity}
            }
            return bk
          })))
         
          clearCart()
      }
      if(response.data.success && response.data.session_url){
        window.location.href=response.data.session_url
     
      }else{
        toast.error('stripe payment error')
      }
      }else{
        return null
      }

    } catch (error) {
      toast.error('unable to make order')
    }
  }
  return (
    isLoggedIn? (
          <>
          <Userlinks/>
    <div className='ordercontents'>
      <div className='placetitle'>
        <h2>please fill in the form below with the correct details</h2>
      </div>
      <div className='orederform'>
        <form onSubmit={checkOut}>
          <div className='oredername'>
            <label>full names</label>
            <input type='text' name='name' value={ordererDetails.name} onChange={handleDetails}/>
          </div>
          <div className='orederemail'>
            <label>email</label>
            <input type='text' name='email' value={ordererDetails.email} onChange={handleDetails}/>
          </div>
          <div className='orederphone'>
            <label>phone Number</label>
            <input type='text' name='phoneNumber' value={ordererDetails.phoneNumber} onChange={handleDetails}/>
          </div>
          <div className='oredercountry'>
            <label>country</label>
            <input type='text' name='country' value={ordererDetails.country} onChange={handleDetails}/>
            <label>state</label>
            <input type='text' name='state' value={ordererDetails.state} onChange={handleDetails}/>
          </div>
          <div className='oredercity'>
            <label>city</label>
            <input type='text' name='city' value={ordererDetails.city} onChange={handleDetails}/>
            <label>zip code</label>
            <input type='text' name='zipcode' value={ordererDetails.zipcode} onChange={handleDetails}/>
          </div>
          <div className='paymentbtn'>
            <button type='submit' onClick={()=>{setPayment('stripe')}}>procced to pay with stipe</button>
          </div>
        </form>
      </div>
    </div>
    </>
    ):(
      <div className='noordering'>
        <h2>please log in to make orders</h2>
        <Link to='/login'>login</Link>
      </div>
    )
  )
}

export default Placeorder
