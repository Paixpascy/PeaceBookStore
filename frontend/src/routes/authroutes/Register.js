import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [registerDetails,setRegisterDetails]=useState({
        email:'', password:'', name:''
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
        <div className='registertitle'>
            <h2>please fill in the approriate information</h2>
        </div>
        <div className='registerForm'>
            <form onSubmit={submitData}>
                <div className='username'>
                    <label>full name</label>
                    <input type='text' name='name' value={registerDetails.name} onChange={handleregistration}/>
                </div>
                    <div className='username'>
                    <label>email</label>
                    <input type='text' name='email' value={registerDetails.email} onChange={handleregistration}/>
                </div>
                    <div className='username'>
                    <label>password</label>
                    <input type='text' name='password' value={registerDetails.password} onChange={handleregistration}/>
                </div>
                <div className='savebtn'>
                    <button>sign up</button>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default Register
