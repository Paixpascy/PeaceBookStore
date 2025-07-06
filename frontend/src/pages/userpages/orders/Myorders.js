import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { AppContext } from '../../../context/AppContext'


const Myorders = () => {
  const[myOrders,setMyOrders]=useState([])
  const token=localStorage.getItem('token')
  const{isLoggedin}=useContext(AppContext)

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
   /* if(!isLoggedin){
      toast.error('you have to log in to see orders')
      return;
    }*/
    viewOrders()
  },[])

  const noOrders=Object.values(myOrders || {}).every((order)=>order === 0)
  return (
    noOrders?(
      <div className='noorders'>
        <h2>no orders made yet</h2>
      </div>
    ):(
    <>
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
