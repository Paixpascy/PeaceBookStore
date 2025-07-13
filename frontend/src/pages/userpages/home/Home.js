import React from 'react'
import { Link } from 'react-router-dom'
import Arrivals from '../stoke/Arrivals'
import Userlinks from '../../../routes/userroutes/Userlinks'

const Home = () => {
  return (
    <>
    <div className='homecontent'>
      <Userlinks/>
    <div className=''>
      <p></p>
      <img src='/media/intro2.webp' alt='' height='200px'/>
    </div>
    <div className='newarrivals'>
      <h2>new arrivals</h2>
      <Arrivals/>
    </div>
    <div className='categories'>
      <h2>categories</h2>
      <div className='his'>
        <img src='/media/historylogo.jpg' alt='' height='50px'/>
        <Link to='/history'>history books</Link>
      </div>
      <div className='child'>
        <img src='/media/childlogo.avif' alt='' height='50px'/>
        <Link to='/children'>children books</Link>
      </div>
      <div className='cook'>
        <img src='/media/cooklogo.jpg' alt='' height='50px'/>
        <Link to='/cookbooks'>cook books</Link>
      </div>
      <div className='faith'>
        <img src='/media/faithlogo.jpg' alt='' height='50px'/>
        <Link to='/faith'>christian books</Link>
      </div>
      <div className='poems'>
        <img src='/media/poemlogo.jpg' alt='' height='50px'/>
        <Link to='/poems'>poetry books</Link>
      </div>
    </div>
    </div>
    </>
  )
}

export default Home
