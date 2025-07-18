import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import './Ordersmade.css'

const Ordersmade = () => {
    const [allOrders,setAllOrders]=useState([])

    const getAllOrders=async()=>{
        try {
            const response=await axios.get('http://127.0.0.1:3004/ordersRoute/allOrders')
            setAllOrders(response.data.data)
        } catch (error) {
            toast.error('unable to get orders')
        }
    }

    useEffect(()=>{
        getAllOrders()
    },[])

    const deletedOrder=async(id)=>{
        const confirmDelete=Swal.fire({
            title:'sure you want to delete order?',
            text:' changes made can not be undone',
            icon:'warning',
            showCancelButton:true,
            confirmButtonText:'yes',
            cancelButtonText:'cancel'
        })

        if(confirmDelete){
            try {
               const response=await axios.delete(`http://127.0.0.1:3004/ordersRoute/deleteOrder/${id}`)
               if(response.data.data){
                toast.success('order deleted')
               } 
            } catch (error) {
                toast.error('unable to delete order')
            }
        }
    }
  return (
    <>
    <div className=''>
        <div className='orderstitle'>
            <h2>below are the orders made</h2>
        </div>
        <div className='orderscontent'>
            <table>
                <thead>
                    <tr>
                        <th>book</th>
                        <th>name</th>
                        <th>book category</th>
                        <th>price</th>
                        <th>quantity</th>
                        <th>payment method</th>
                        <th>client name</th>
                        <th>client email</th>
                        <th>client phone number</th>
                        <th>client address</th>
                        <th>date order was made</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {allOrders.map((orders)=>(
                        orders.items.map((order,index)=>(
                            <tr key={`${order._id}-${index}`}>
                                <td><img src={order.iteminfo.picture} alt='' height='150px'/></td>
                                <td>{order.iteminfo.name}</td>
                                <td>{order.iteminfo.price}</td>
                                <td>{order.iteminfo.category}</td>
                                <td>{order.quantity}</td>
                                <td>{orders.paymentMethod}</td>
                                <td>{orders.name}</td>
                                <td>{orders.email}</td>
                                <td>{orders.phoneNumber}</td>
                                <td>{orders.address.country},
                                    {orders.address.state},
                                    {orders.address.city},
                                    {orders.address.zipcode}</td>
                                    <td>{new Date(orders.date).toLocaleString()}</td>
                                <td>
                                    <button onClick={()=>{deletedOrder(orders._id)}}>delete order</button>
                                </td>    
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    </>
  )
}

export default Ordersmade
