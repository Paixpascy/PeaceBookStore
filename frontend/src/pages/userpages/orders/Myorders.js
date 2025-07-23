import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { AppContext } from '../../../context/AppContext'
import './Myorders.css'
import Userlinks from '../../../routes/userroutes/Userlinks'

const Myorders = () => {
  const[myOrders,setMyOrders]=useState([])
  const token=localStorage.getItem('token')
  const{isLoggedIn}=useContext(AppContext)
  console.log('placeorder login',isLoggedIn)

  const viewOrders=async()=>{
    const response= await axios.get('http://127.0.0.1:3004/ordersRoute/myOrders',{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    if(response.data.data){
      setMyOrders(response.data.data)
    }else{
      toast.error('unable to get orders')
    }
  }

  useEffect(()=>{
    if(!isLoggedIn){
      toast.error('you have to log in to see orders')
      return;
    }
    viewOrders()
  },[isLoggedIn])

  //const noOrders=Object.values(myOrders || {}).every((order)=>order === 0)
  const noOrders=myOrders.length === 0
  return (
    noOrders?(
      <div className='noorders'>
        <Userlinks/>
        <h2>no orders made yet</h2>
      </div>
    ):(
    <>
    <Userlinks/>
    <div className='myorderscontent'>
      <div className='titleorder'>
        <h2>orders made</h2>
      </div>
      <div className='orderslist'>
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>book</th>
              <th>price</th>
              <th>category</th>
              <th>quantity</th>
              <th>payment method</th>
              <th>date order was made</th>
            </tr>
          </thead>
          <tbody>
            {myOrders.map((orders)=>(
              orders.items.map((book,index)=>(
                <tr key={`${orders._id}-${index}`}>
              
                  <td>{book.iteminfo.name}</td>
                  <td><img src={book.iteminfo.picture} alt='' height='150px'/></td>
                  <td>{book.iteminfo.price}</td>
                  <td>{book.iteminfo.category}</td>
                  <td>{book.quantity}</td>
                  <td>{orders.paymentMethod}</td>
                  <td>{new Date(orders.date).toLocaleString()}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
    )
  )
}

export default Myorders
