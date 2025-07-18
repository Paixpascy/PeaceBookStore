import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import './Addbook.css'

const Addbook = () => {
        const[bookDetails,setBookDetails]=useState({
        name:'',picture:'', author:'', category:'', price:'', stoke:''
    })
    const handleBookDetails=((e) =>{
        setBookDetails({...bookDetails,[e.target.name]:e.target.value})
    })

    const[picture,setPicture]=useState()
    const handlePicture=((e) =>{
        setPicture(e.target.files[0])
    })

    const navigate=useNavigate()
    const saveBook=(async(e) =>{
        e.preventDefault()
        try {
            if(!bookDetails.name|| !bookDetails.author|| !bookDetails.category|| !bookDetails.price|| !picture ||!bookDetails.stoke){
                toast.error('missing fields')
                return
            }

            const formdata=new FormData()
            formdata.append('image',picture)
            const pictureResponse= await fetch('http://127.0.0.1:3004/images',{
                method:'POST',
                body:formdata
            })

            const detailsResponse=await pictureResponse.json()
            if(detailsResponse.image_url){
                bookDetails.picture=detailsResponse.image_url

                await fetch('http://127.0.0.1:3004/booksRoute/addbook',{
                    method:'POST',
                    headers:{
                        accept:'application/json',
                        "Content-Type":'application/json'
                    },
                    body:JSON.stringify(bookDetails)
                })
                toast.success('book added successfully')
                navigate('/booklist')
            }
        } catch (error) {
            toast.error("unable to add book")
        }
    })
  return (
    <>
    <div className='addbooktitle'>
        <h2>please fill in the form with the appropriate information</h2>
    </div>
    <form onSubmit={saveBook} className='addbkform'>
        <div className='addtopdtimg'>
            <img src='/media/addpdt.png' alt='' height='50px'/>
            <p>add to product form</p>
        </div>
        <hr/>
        <div className='bookname'>
            <label> book name</label>
            <input type='text' name='name' value={bookDetails.name} onChange={handleBookDetails}/>
        </div>
        <div className='bookpicture'>
            <label><img src={picture? URL.createObjectURL(picture):bookDetails.picture ||'/media/upload_area.svg'} alt=''/> </label>
            <input type='file' name='picture'onChange={handlePicture} className='picinput'/>
        </div>
        <div className='bookauthor'>
            <label> book author</label>
            <input type='text' name='author' value={bookDetails.author} onChange={handleBookDetails}/>
        </div>
            <div className='bookcategory'>
            <label> book category</label>
            <select type='text' name='category' value={bookDetails.category} onChange={handleBookDetails}>
                <option></option>
                <option>Children</option>
                <option>Faith</option>
                <option>History</option>
                <option>Poems</option>
                <option>Cookbooks</option>
            </select>
        </div>
        <div className='bookprice'>
            <label> book price</label>
            <input type='text' name='price' value={bookDetails.price} onChange={handleBookDetails}/>
        </div>
        <div className='bookstoke'>
            <label> amount available</label>
            <input type='number' name='stoke' value={bookDetails.stoke} onChange={handleBookDetails}/>
        </div>
        <div className='savebutton'>
            <button type='submit'>save</button>
        </div>
    </form>
    </>
  )
}

export default Addbook
