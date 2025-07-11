import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

const Editbook = () => {
    const[editedBook,setEditedBook]=useState({
        picture:'', name:'', author:'', category:'', price:'', stoke:'',
    }) 
    const handleBookDetails=(e)=>{
        setEditedBook({...editedBook,[e.target.name]:e.target.value})
    }

    const [editedPicture,setEditedPicture]=useState()
    const handleEditedPicture=(e)=>{
        setEditedPicture(e.target.files[0])
    }

    const{id}=useParams()
    useEffect(()=>{
        axios.get(`http://127.0.0.1:3004/booksRoute/getbook/${id}`)
        .then((response) =>{
            setEditedBook(response.data?.data)
        })
    },[id])

    const navigate=useNavigate()
    
    const saveChanges=async(e) =>{
        e.preventDefault()
        try {
            if(editedPicture){
            const formdata=new FormData()
            formdata.append('image',editedPicture)
            const editedPictureResponse=await fetch('http://127.0.0.1:3004/images',{
                method:'POST',
                body:formdata,
            })
            const editedDetails=await editedPictureResponse.json()
            if(editedDetails.image_url){
                editedBook.picture=editedDetails.image_url
            }
        }
            await axios.put(`http://127.0.0.1:3004/booksRoute/editbook/${id}`,editedBook,{
                headers:{
                    Accept:'application/json',
                   'Content-Type':'application/json'
                }
            })
            toast.success('book details edited successfully')
            navigate('/booklist')
        } catch (error) {
            toast.error('unable to edit book')
        }
    }
  return (
    <>
    <div className='bookdetails'>
        <div className='title'>
            <h2>please edit appropriately</h2>
        </div>
        <div className='bookform'>
            <form onSubmit={saveChanges}>  
                <div className='bookpicture'>
                    <img src={editedPicture?URL.createObjectURL(editedPicture):editedBook.picture ||'/media/upload_area.svg'} alt='pic' height='100px'/>
                    <input type='file' name='picture' onChange={handleEditedPicture}></input>
                </div>
                <div className='bookname'>
                    <label>book name</label>
                    <input type='text' name='name' value={editedBook.name} onChange={handleBookDetails}></input>
                </div>
                <div className='bookname'>
                    <label>book author</label>
                    <input type='text' name='author' value={editedBook.author} onChange={handleBookDetails}></input>
                </div>
                 <div className='bookcategory'>
                    <label>book category</label>
                    <select type='text' name='category' value={editedBook.category} onChange={handleBookDetails}>
                        <option>Children</option>
                        <option>Faith</option>
                        <option>History</option>
                        <option>Poems</option>
                        <option>Cookbooks</option>
                    </select>
                </div>
                <div className='bookname'>
                    <label>book price</label>
                    <input type='text' name='price' value={editedBook.price} onChange={handleBookDetails}></input>
                </div>
                <div className='bookname'>
                    <label>amount available</label>
                    <input type='number' name='stoke' value={editedBook.stoke} onChange={handleBookDetails}></input>
                </div>
                <div className='savebutn'>
                    <button type='submit'>save changes</button>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default Editbook
