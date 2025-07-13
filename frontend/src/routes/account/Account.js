import axios from 'axios'
import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'

const Account = () => {
    const{setisLoggedin,isLoggedIn,userData}=useContext(AppContext)

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
        <div className='greeting'>
            <h2> hello {isLoggedIn? userData?.name: 'user'}</h2>
        </div>
        <div className='cart'>
            <button><Link to='/cart'>cart</Link></button>
        </div>
        <div className='cart'>
            <button><Link to='/myorders'>orders</Link></button>
        </div>
        <div className='cart'>
            <button><Link to='/profile'>profile</Link></button>
        </div>
        <div className='logout'>
            <button onClick={logOut}>logout</button>
        </div>
        <div className='logout'>
            <button onClick={unRegister}>delete account</button>
        </div>
    </>
    ):(
        <div className='notlogged'>
            <div className='cart'>
                <button><Link to='/cart'>cart</Link></button>
            </div>
            <div className='cart'>
                <button><Link to='/myorders'>orders</Link></button>
            </div>
            <div className='cart'>
                <button><Link to='/login'>login</Link></button>
            </div>
        </div>
    )
  )
}

export default Account
