
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import './Profile.css'

const Profile = () => {

  const{isLoggedIn}=useContext(AppContext)
  const [profileDetails,setProfileDetails]=useState(null)

  const{id}=useParams()
  const token=localStorage.getItem('token')

  useEffect(()=>{
    if(!isLoggedIn){
      return null;
    }else{
      axios.get(`http://127.0.0.1:3004/authRoute/getProfile/${id}`,{
      headers:{
        Authorization: `bearer ${token}`
      }

    }).then((response)=>{
      setProfileDetails(response.data?.data)
    }).catch((error)=>{
      console.log('error getting profile details',error)
    })
    
  }
  },[id])

  return (
    profileDetails?(
      <div className='allprofdts'>
        <div className='imgname'>
          <img src={profileDetails.picture || '/media/upload_area.svg'} alt='' height='400px'/>
          <p>{profileDetails.name}</p>
        </div>
        <div className='otherprofdts'>
          <h3>other details</h3>
          <p><b>email</b>:{profileDetails.email}</p>
          <p><b>address</b>:{profileDetails.address}</p>
          <p><b>phone Number</b>:{profileDetails.phoneNumber}</p>
          <p><b>gender</b>:{profileDetails.gender}</p>
          <p><b>date of birth</b>:{profileDetails.Dob}</p>
        <div className='editlink'>
          <button><Link to='/edtiprofile'>edit profile details</Link></button>
        </div>
        </div>
      </div>
      
    ):(
      <p></p>
    )
  )
}
export default Profile
