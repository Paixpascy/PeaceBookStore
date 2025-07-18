import axios from 'axios'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import './Login.css'

const Login = () => {
  const {isLoggedIn,setisLoggedin,UserInfo}=useContext(AppContext)
  const[loginDetails,setLoginDetails]=useState({
    email:'', password:''
   
  })
   const handleLoginDetails=(e)=>{
    setLoginDetails({...loginDetails,[e.target.name]:e.target.value})
   }

   const navigate=useNavigate()
   const submitData=async(e)=>{
    e.preventDefault()

    const validEmail=/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if(!validEmail.test(loginDetails.email)){
      toast.error('email address is not valid')
      return;
    }

    try {
      if(!loginDetails.email|| !loginDetails.password){
        toast.error('please fill in all the details')
      }

      const loginResponse= await axios.post('http://127.0.0.1:3004/authRoute/login',loginDetails)

      if(loginResponse.data.token && loginResponse.data.data){
        localStorage.setItem('token',loginResponse.data.token)
        localStorage.setItem('role',loginResponse.data.role)
        localStorage.setItem('userdata',JSON.stringify(loginResponse.data.data))
        console.log('id from login is',loginResponse.data.data._id)
        setisLoggedin(true)
       await UserInfo(loginResponse.data.data._id)
      }
      if(loginResponse.data.role==='admin'){
        setLoginDetails(loginResponse.data.data)
        toast.success('login successful')
        navigate('/admin')
      }else{
        navigate('/')
        return;
      }
    } catch (error) {
      if(error.response?.data?.error?.includes('jwt expired')){
        toast.error('please login once more')
      }else{
        toast.error('unable to log in')
      }
    }
   }

  return (
    <>
    <div className='loginbox'>
    <div className='logincontent'>
      
      <div className='logintitle'>
          <img src='/media/loginimg.jpg' alt='' />
      </div>
      
      <div className='loginform'>
        <form onSubmit={submitData}>
          <div className=''>
            <h2>login</h2>
            <p>welcome back</p>
          </div>
          <div className='loginame'>
            <label>email</label>
            <input type='text' name='email' value={loginDetails.email} onChange={handleLoginDetails}/>
          </div>
            <div className='loginpswd'>
            <label>password</label>
            <input type='text' name='password' value={loginDetails.password} onChange={handleLoginDetails}/>
          </div>
          <div className='loginbtn'>
            <button type='submit'> login</button>
          </div>
        </form>
      </div>
    </div>
    </div>
    </>
  )
}

export default Login
