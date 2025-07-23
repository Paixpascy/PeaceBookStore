import React from 'react'
import { Link } from 'react-router-dom'
import Arrivals from '../stoke/Arrivals'
import Userlinks from '../../../routes/userroutes/Userlinks'
import './Home.css'

const Home = () => {
  return (
    <>
    <div className='homecontent'>
      <Userlinks/>
    <div className='homepic'>
      <img src='/media/homepic3.jpg' alt='homepic'/>
      <h2>the best place to buy<br/> your favourite book</h2>
      <p>Enjoy Free Photos for Great Design & Creative Projects. Discover All Our Image Collections.<br/> Free Photos, Free Pictures, Free Images and Fresh Content Weekly.
         Site visitors: Over 10K in the past month</p>
    </div>
    <div className='newarrivals'>
      <h2>new arrivals</h2>
      <Arrivals/>
    </div>
    <div className='categoriescards'>
      <h2>categories</h2>
      <div className='categorieslink'>

      <div className='categories'>
        <img src='/media/historylogo.jpg' alt=''/>
        <Link to='/history'>history books</Link>
      </div>

      <div className='categories'>
        <img src='/media/childlogo.avif' alt='' />
        <Link to='/children'>children books</Link>
      </div>

      <div className='categories'>
        <img src='/media/cooklogo.jpg' alt='' />
        <Link to='/cookbooks'>cook books</Link>
      </div>

      <div className='categories'>
        <img src='/media/faithlogo.jpg' alt='' />
        <Link to='/faith'>christian books</Link>
      </div>
      
      <div className='categories'>
        <img src='/media/poemlogo.jpg' alt='' />
        <Link to='/poems'>poetry books</Link>
      </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default Home
