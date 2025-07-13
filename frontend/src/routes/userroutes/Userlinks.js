
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Userlinks = () => {

  const[dropDown,setDropDown]=useState(false)
  return (
    <>
    <div className='userlinks'>
      <Link to='/'>home</Link>
      <div className='dropdown' onMouseEnter={()=>setDropDown(true)} onMouseLeave={()=>setDropDown(false)}>
        BOOKS{
          dropDown && (
            <div className='booksmenu'>
                <Link to='/books'> all books</Link><br/>
                <Link to='/children'>children</Link><br/>
                <Link to='/poems'>poem</Link><br/>
                <Link to='/history'>history</Link><br/>
                <Link to='/cookbooks'>cook books</Link><br/>
                <Link to='/faith'>christian</Link><br/>
            </div>
          )
        }
      </div>
      <div className='ourcart'>
        <button><Link to='/cart'>cart</Link><br/></button>
      </div>
    </div>
    </>
  )
}

export default Userlinks
/*
      <h1>welcome to peace book store</h1>

 */