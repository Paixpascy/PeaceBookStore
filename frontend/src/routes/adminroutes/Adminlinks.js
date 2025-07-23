import React from 'react'
import { Link } from 'react-router-dom'
import './Adminlinks.css'

const Adminlinks = () => {
  return (
    <>

    <div className='linksadmin'> 

      <Link to='/addbook'>add books</Link>
      <Link to='/booklist'>list of books</Link>
      <Link to='/users/:id'>users</Link>
      <Link to='/ordersmade'>allorders</Link>
    
    </div>
    <hr/>
    </>
  )
}

export default Adminlinks
