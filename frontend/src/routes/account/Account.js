import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import './Account.css'
import Profile from './Profile'
import { IoMdLogOut } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import Userlinks from '../userroutes/Userlinks'

const Account = () => {
    const{setisLoggedin,isLoggedIn,userData}=useContext(AppContext)
   //const[dropDown,setDropdown]=useState(false)

    const navigate=useNavigate()
    const logOut=async()=>{
        try {
        const logoutResponse= await axios.post('http://127.0.0.1:3004/authRoute/logout')
        if(logoutResponse.data.success===true){
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            localStorage.removeItem('userdata')
            setisLoggedin(false)
            navigate('/')
        }
        } catch (error) {
            toast.error('unable to logout')
        }
    }

    
    const unRegister=async()=>{
                const deleteAccount= await Swal.fire({
                title:'want to delete account?',
                text:'changes made can not be undone',
                icon:'warning',
                showCancelButton:true,
                confirmButtonText:'yes, delete account',
                cancelButtonText:'cancel',
            })
            if(deleteAccount.isConfirmed){
                
                try {
                    const token=localStorage.getItem('token')
                    const unregisterResponse= await axios.delete('http://127.0.0.1:3004/authRoute/unregister',{
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    })
                    console.log('unregister response',unregisterResponse)
                    if(unregisterResponse && unregisterResponse.status === 202){
                        localStorage.removeItem('token')
                        localStorage.removeItem('role')
                        localStorage.removeItem('userdata')
                        toast.success('account has been deleted')
                        navigate('/')
                    }else{
                        toast.error('unable to delete account')
                    }
                } catch (error) {
                    toast.error('unable to delete account')
                    console.log('unregister error',error)
                }
            }
    }
  return (
    isLoggedIn?(
    <>
    <Userlinks/>
    <div className='account'>
        <div className='sidebar'>

        <div className='sidelink'>
            <img src='/media/ordersimg.jpg' alt='' height='50px'/>
            <Link to='/cart'>cart</Link>
        </div>
        <div className='sidelink'>
            <img src='/media/productimg.jpg' alt='' height='50px'/>
            <Link to='/myorders'>orders</Link>
        </div>
       {/*} <div className='cart'>
            <Link to='/profile'>profile</Link>
        </div>*/}
        <div className='sidelink'>
            <IoMdLogOut onClick={logOut} size='3rem' color='blue'/>logout
        </div>
        <div className='sidelink'>
            <RiDeleteBin6Line onClick={unRegister} size='3rem' color='red'/>delete account
        </div>
        </div>
        <div className='acountmain'>
        <div className='greeting'>
            <h2> hello {isLoggedIn? userData?.name: 'user'}</h2>
        </div>
            <Profile/>
        </div>
    </div>    
    </>
    ):(
        
        <div className='noaccount'>
            <Userlinks/>
            <div className='noaccountlink'>
                
            <div className='noaccountcard'>
                <img src='/media/productimg.jpg' alt='' />
                <button><Link to='/cart'>cart</Link></button>
            </div>
            <div className='noaccountcard'>
                <img src='/media/ordersimg.jpg' alt='' />
                <button><Link to='/myorders'>orders</Link></button>
            </div>
            <div className='noaccountcard'>
                <img src='/media/loginimg.webp' alt='' />
                <button><Link to='/login'>login</Link></button>
            </div>
            </div>
        </div>
    )
  )
}

export default Account
