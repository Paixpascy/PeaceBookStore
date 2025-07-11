
import React from 'react'
import { Link } from 'react-router-dom'
const Userlinks = () => {
  return (
    <>
        <div>
      <h1>welcome to peace book store</h1>
      <Link to='/books'>books</Link><br/>
      <Link to='/children'>children</Link><br/>
      <Link to='/poems'>poem</Link><br/>
      <Link to='/history'>history</Link><br/>
      <Link to='/cookbooks'>cook books</Link><br/>
      <Link to='/faith'>faith</Link><br/>
      <Link to='/cart'>cart</Link><br/>
      <Link to='/myorders'>orders</Link><br/>
      <Link to='/account'>account</Link>
    </div>
    </>
  )
}

export default Userlinks
