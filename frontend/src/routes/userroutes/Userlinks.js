
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Userlinks.css'
import { LuShoppingCart } from "react-icons/lu";

const Userlinks = () => {

  //const[dropDown,setDropDown]=useState(false)
  return (
    <>
    <div className='userlinks'>
      <Link to='/'>home</Link>        
      <Link to='/books'> all books</Link><br/>
      <Link to='/children'>children</Link><br/>
      <Link to='/poems'>poem</Link><br/>
      <Link to='/history'>history</Link><br/>
      <Link to='/cookbooks'>cook books</Link><br/>
      <Link to='/faith'>christian</Link><br/>
      <div className='ourcart'>
       <Link to='/cart'> <LuShoppingCart size='1.4rem' /></Link>
      </div>
    </div>
    <hr/>
    </>
  )
}

export default Userlinks
/*
      <h1>welcome to peace book store</h1>

 */