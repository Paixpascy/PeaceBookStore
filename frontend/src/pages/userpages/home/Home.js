import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>welcome to peace book store</h1>
      <Link to='/books'>books</Link>
      <Link to='/children'>children</Link>
      <Link to='/poems'>poem</Link>
      <Link to='/history'>history</Link>
    </div>
  )
}

export default Home
