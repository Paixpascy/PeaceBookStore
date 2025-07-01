
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { Link } from 'react-router-dom'
import Item from './Item'

const Books = () => {
    const {allBooks}=useContext(AppContext)
    const[books,setBooks]=useState([])

    useEffect(()=>{
        setBooks(allBooks)
    },[allBooks])
  return (
    <>
    <div className='allbookscontent'>
      <div className='bookstitlte'>
        <h2>list of all the books available</h2>
      </div>
      <div className='listofbooks'>
        {books.length >0 && books.map((book,index)=>(
         <Link to={`/bookdetails/${book._id}`} key={index}><Item id={book._id} picture={book.picture} 
         name={book.name} author={book.author} category={book.category} price={book.price} stoke={book.stoke}/> </Link>
        ))}
      </div>
    </div>
    </>
  )
}

export default Books
