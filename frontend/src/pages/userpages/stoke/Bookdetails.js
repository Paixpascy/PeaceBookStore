import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { useParams } from 'react-router-dom'


const Bookdetails = () => {
    const{allBooks}=useContext(AppContext)
    const[singleBook,setSingleBook]=useState()

    const{bkid}=useParams()
    useEffect(()=>{
        const bookkDetails=allBooks.find((e)=>e._id === bkid)
        if(bookkDetails){
            setSingleBook(bookkDetails)
        }
  
    },[bkid,allBooks])
  return (
    singleBook !==undefined?(
    <>
    <div className='bookdeetailscontent'>
        <div className='bookname'>
            <p>{singleBook.name}</p>
        </div>
        <div>
        <img src={singleBook.picture} alt='bookpicture' height='150px'/>
        <p>author:{singleBook.author}</p>
        <p>category:{singleBook.category}</p>
        <p>price:{singleBook.price}</p>
        </div>
    </div>
    </>
    ):(<p>book not available</p>)

  )
}

export default Bookdetails
