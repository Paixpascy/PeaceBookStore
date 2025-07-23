
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Item from '../stoke/Item';
import './Search.css'
import Userlinks from '../../../routes/userroutes/Userlinks';

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
    <Userlinks/>
    {results.length >0?(
        <div className='resultsfound'>
            {Array.isArray(results) && results.map((book,index)=>(
              <Link to={`/bookdetails/${book._id}`} key={index}><Item id={book._id} picture={book.picture} 
         name={book.name} author={book.author} category={book.category} price={book.price}/></Link>
            ))}
        </div>
    ):(
        <div className='nosearch'>
            
            <p>no results for {term} seacrh</p>
        </div>
        
    )}
    </>
  )
}

export default Searched
