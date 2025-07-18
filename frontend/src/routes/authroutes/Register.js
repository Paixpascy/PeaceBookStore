
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'

const Register = () => {
    const [registerDetails,setRegisterDetails]=useState({
        email:'', password:'', name:'', phoneNumber:'', address:'', gender:'', Dob:''
    })
    const handleregistration=(e)=>{
        setRegisterDetails({...registerDetails,[e.target.name]:e.target.value})
    }

    const navigate=useNavigate()
    const submitData=async(e)=>{
        e.preventDefault()
        const validEmail=/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if(!validEmail.test(registerDetails.email)){
            toast.error('email id is invalid');
            return;
        }

        try {
            if(!registerDetails.name ||!registerDetails.email ||!registerDetails.password ){
            toast.error("please fill in all the fields")
        }

            const registerResponse= await axios.post('http://127.0.0.1:3004/authRoute/register',registerDetails)
            if(registerResponse){
                setRegisterDetails(registerResponse.data.data)
                toast.success('sign up successful')
                navigate('/login')
            }
            
        } catch (error) {
            toast.error('failed to register')
        }
    }

  return (
    <>
    <div className='registercontents'>

        <div className='registerForm'>
            <form onSubmit={submitData}>
        <div className='registertitle'>
            <h2>create account</h2>
        </div>
                <div className='username'>
                    <label>full name</label>
                    <input type='text' name='name' value={registerDetails.name} onChange={handleregistration} required/>
                </div>
                    <div className='useremail'>
                    <label>email</label>
                    <input type='text' name='email' value={registerDetails.email} onChange={handleregistration} required/>
                </div>
                    <div className='userpswd'>
                    <label>password</label>
                    <input type='text' name='password' value={registerDetails.password} onChange={handleregistration} required/>
                </div>
                <div className='usergender'>
                    <label>gender</label>
                    <select name='gender' value={registerDetails.gender} onChange={handleregistration}>
                        <option></option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </div>
                <div className='userdob'>
                    <label>date of birth</label>
                    <input type='date' name='Dob' value={registerDetails.Dob} onChange={handleregistration}/>
                </div>
                <div className='useraddress'>
                    <label>address</label>
                    <input type='text' name='address' value={registerDetails.address} onChange={handleregistration}/>
                </div>
                <div className='userphone'>
                    <label>phone number</label>
                    <input type='text' name='phoneNumber' value={registerDetails.phoneNumber} onChange={handleregistration}/>
                </div>
                <div className='registerbtn'>
                    <button>sign up</button>
                </div>
                <div className='tologin'>
                    <p>already have an account</p>
                    <button><Link to='/login'>login</Link></button>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default Register
