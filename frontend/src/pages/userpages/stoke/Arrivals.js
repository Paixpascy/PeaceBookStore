import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Item from './Item'
import { Link } from 'react-router-dom'

const Arrivals = () => {

    const[newCollection,setNewCollection]=useState([])

    useEffect(()=>{
        axios.get('http://127.0.0.1:3004/booksRoute/newCollection')
        .then((resposne)=>{
            setNewCollection(resposne.data.data)
        }).catch((error)=>{
            console.log('unable to get new arrivals',error)
        })
    },[])
  return (
    newCollection?(
        <>
        <div className='newones'>
            {newCollection.map((book,index)=>(
                <Link to={`/bookdetails/${book._id}`} key={index}><Item id={book._id} name={book.name} 
                picture={book.picture} author={book.author} category={book.category} price={book.price}/></Link> 
            ))}
        </div>
        </>
    ):(
        <p>no latest collections</p>
    )
  )
}

export default Arrivals
