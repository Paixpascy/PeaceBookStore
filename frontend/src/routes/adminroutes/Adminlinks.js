import React from 'react'
import { Link } from 'react-router-dom'

const Adminlinks = () => {
  return (
    <div>
      <Link to='/addbook'>add books</Link><br/>
      <Link to='/booklist'>list of books</Link><br/>
      <Link to='/users/:id'>users</Link><br/>
      <Link to='/ordersmade'>allorders</Link>
      
    </div>
  )
}

export default Adminlinks
