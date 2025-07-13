
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'

const Editprofile = () => {
  const{isLoggedIn}=useContext(AppContext)
  const[profileDetails,setProfileDetails]=useState({
    name:'', picture:'', email:'', Dob:'', address:'', phoneNumber:'', gender:'',
  })
  const handleProfile=(e)=>{
    setProfileDetails({...profileDetails,[e.target.name]: e.target.value})
  }

  const [profilePic,setProfilePic]=useState()
  const handlePicture=(e)=>{
    setProfilePic(e.target.files[0])
  }

  const{id}=useParams()
  const token=localStorage.getItem('token')
  const navigate=useNavigate()

  useEffect(()=>{
    axios.get(`http://127.0.0.1:3004/authRoute/getProfile/${id}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }

    }).then((response)=>{
      setProfileDetails(response.data?.data)
    }).catch((error)=>{
      console.log('error getting profile details',error)
    })
    
  },[id])

  const saveChanges=async(e)=>{
    e.preventDefault()

    if(!isLoggedIn){
      return null;
    }
    try {
      if(profilePic){
      const formData=new FormData()
      formData.append('image',profilePic)
      const pictureResponse= await fetch('http://127.0.0.1:3004/images',{
        method:'POST',
        body:formData
      })

      const editedProfpic= await pictureResponse.json()
      if(editedProfpic.image_url){
        profileDetails.picture= editedProfpic.image_url
      }
    }

     const response=await axios.put(`http://127.0.0.1:3004/authRoute/editprofile/${id}`,profileDetails,{
      headers:{
        Authorization:`Bearer ${token}`,
        Accept:'application/json',
        'Content-Type':'application/json'
      }
     })
     if(response.status===202){
       toast.success('profile details edited')
       navigate('/profile')
     }else{
      toast.error('please try making changes once more')
     }

    } catch (error) {
      toast.error('failed to update profile details')
    }
  }

  return (
    <>
    <div className='profiledetails'>
      <form onSubmit={saveChanges}>
        <div className=''>
         <img src={profilePic? URL.createObjectURL(profilePic):profileDetails.picture || '/media/upload_area.svg'} alt='' height='150px'/>
         <input type='file' onChange={handlePicture}/><br/>
         <input type='text' name='name' value={profileDetails.name} onChange={handleProfile}/>
        </div>
        <hr/>
        <div className='otherdetails'>
          <h3>other profile details</h3>
        <div className='email'>
          <label>email</label>
          <input type='text' name='email' value={profileDetails.email} onChange={handleProfile}/>
        </div>
        <div className='address'>
          <label>address</label>
          <input type='text' name='address' value={profileDetails.address} onChange={handleProfile}/>
        </div>
        <div className='phonenumber'>
          <label>phone number</label>
          <input type='text' name='phoneNumber' value={profileDetails.phoneNumber} onChange={handleProfile}/>
        </div>
        <div className='gender'>
          <label>gender</label>
          <select  name='gender' value={profileDetails.gender} onChange={handleProfile}>
            <option></option>
            <option>male</option>
            <option>Female</option>
          </select>
        </div>
        <div className='email'>
          <label>date of birth</label>
          <input type='date' name='Dob' value={profileDetails.Dob} onChange={handleProfile} max={new Date().toISOString().split('T')[0]}/>
        </div>
        </div>
        <div className='profilebtn'>
            <button type='submit'>save changes</button>
        </div>
      </form>
    </div>
    </>
  )
}

export default Editprofile
