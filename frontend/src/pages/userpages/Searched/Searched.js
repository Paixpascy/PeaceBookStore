
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Item from '../stoke/Item';
const Searched = () => {
      const[results,setResults]=useState([])
      const [searchParams]=useSearchParams()
      const term=searchParams.get('term')

      useEffect(()=>{
        const searchResults= async()=>{
            try {
            const searchResponse=await axios.get(`http://127.0.0.1:3004/booksRoute/search?term=${term}`)
            setResults(searchResponse.data.data)
            } catch (error) {
                toast.error('unable to get searched results')
            }
        } 
        if(term){
            searchResults()
        }
      },[term])
  return (
    <>
    {results.length >0?(
        <div className='resultsfound'>
            {results.map((book,index)=>(
              <Link to={`/bookdetails/${book._id}`} key={index}><Item id={book._id} picture={book.picture} 
         name={book.name} author={book.author} category={book.category} price={book.price}/></Link>
            ))}
        </div>
    ):(
        <p>no results for {term} seacrh</p>
    )}
    </>
  )
}

export default Searched
