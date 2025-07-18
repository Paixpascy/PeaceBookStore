import React from 'react'
import { Link } from 'react-router-dom'

const Adminlinks = () => {
  return (
    <>
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
      <div className='booksadd'>
        <img src='/media/addpdt.png' alt='' height='100px'/>
        <Link to='/addbook'>add books to list</Link>
      </div>
      <div className='adminbooklist'>
        <img src='/media/pdtlist.jpeg' alt='' height='100px'/>
        <Link to='/booklist'>list of books</Link>
      </div>
      <div className='adminorders'>
        <img src='/media/adminorder.webp' alt='' height='100px'/>
        <Link to='/ordersmade'>orders made</Link>
      </div>
      <div className='addminusers'>
        <img src='/media/adminusers.jpeg' alt='' height='100px'/>
        <Link to='/users/:id'>list of users</Link>
      </div>
    </div>
    </div>
    </>
  )
}

export default Adminlinks
