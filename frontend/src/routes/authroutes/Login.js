import axios from 'axios'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'

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
      toast.error('unable to login')
    }
   }

  return (
    <>
    <div className='logincontent'>
      <div className='logintitle'>
        <h2>please fill in the correct details</h2>
      </div>
      <div className='loginform'>
        <form onSubmit={submitData}>
          <div className='email'>
            <label>email</label>
            <input type='text' name='email' value={loginDetails.email} onChange={handleLoginDetails}/>
          </div>
            <div className='email'>
            <label>password</label>
            <input type='text' name='password' value={loginDetails.password} onChange={handleLoginDetails}/>
          </div>
          <div className='loginbtn'>
            <button type='submit'> login</button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login
