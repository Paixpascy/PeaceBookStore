
import React, { useContext, useState } from 'react'
import { FcSearch } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import ReactSwitch from 'react-switch'

const Navbar = () => {

    const[searchTerm,setSearchTerm]=useState('')
    const navigate=useNavigate()
    const{theme,handleTheme,isLoggedIn}=useContext(AppContext)

    const handleSearch=async(e)=>{

        const cleanTerm=searchTerm.trim()
        e.preventDefault()
        if(!cleanTerm)return;
        navigate(`/search?term=${encodeURIComponent(cleanTerm)}`)

    }
  return (
    <div className='navcontent'>
        <div className='logo'>
            <img src='/media/logo.jpg' alt='logo' height='50px'/>
        </div>
        <div className='storename'>
            <h1>PEACE BOOK STORE</h1>
        </div>
        <div className='search'>
            <form onSubmit={handleSearch}>
                <input type='text' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
                <button type='submit'><FcSearch /></button>
            </form>
        </div>
        <div className='theme'>
            <label>theme </label>
            <ReactSwitch onChange={handleTheme} checked={theme==='light'}/>
            <label>{theme==='light'? 'light mode': 'dark mode'}</label>
        </div>
        <div className='authe'>
            {isLoggedIn?(
                <button><Link to='/account'>account</Link></button>
            ):(
                <button><Link to='/register'>register/login</Link></button>
            )}
        </div>
    </div>
  )
}

export default Navbar
