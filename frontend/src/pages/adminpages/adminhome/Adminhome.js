
import React from 'react'
import { Link } from 'react-router-dom'
import './Adminhome.css'

const Adminhome = () => {
  return (
      <div className='admincontent'>
    <div className='adminsidebar'> 
      <ul>
      <li><Link to='/addbook'>add books</Link></li><br/>
      <li><Link to='/booklist'>list of books</Link></li><br/>
      <li><Link to='/users/:id'>users</Link></li><br/>
      <li><Link to='/ordersmade'>allorders</Link></li>
      </ul>
    </div>
    <div className='adminmain'>
      <h2></h2>

      <div className='admincards'>
        <div className='booksadd'>
          <img src='/media/addpdt.png' alt='' />
          <Link to='/addbook'>add books to list</Link>
      </div>
      <div className='adminbooklist'>
          <img src='/media/pdtlist.jpeg' alt='' />
          <Link to='/booklist'>list of books</Link>
      </div>
      <div className='adminorders'>
          <img src='/media/adminorder.webp' alt='' />
          <Link to='/ordersmade'>orders made</Link>
      </div>
      <div className='adminusers'>
          <img src='/media/adminusers.jpeg' alt='' />
          <Link to='/users/:id'>list of users</Link>
      </div>
    </div>
      </div>

    </div>
  )
}

export default Adminhome
