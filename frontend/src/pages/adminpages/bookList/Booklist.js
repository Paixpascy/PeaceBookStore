
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import './Booklist.css'
import Adminlinks from '../../../routes/adminroutes/Adminlinks'

const Booklist = () => {
    const[allBooks,setAllBooks]=useState([])

    const getAllBooks=async() =>{
        try {
            const boookResponse= await axios.get('http://127.0.0.1:3004/booksRoute/getbooks')
            setAllBooks(boookResponse.data.data)
        } catch (error) {
            toast.error('unable to get books',error)
        }
    }
    useEffect(()=>{
         getAllBooks()
    },[])
   
    const deleteBook=async(id)=>{
        const confrimDelete= await Swal.fire({
            title:'delete book',
            text:'are you sure you want to delete book? changes cant be undone',
            icon:'warning',
            showCancelButton:true,
            confirmButtonText:'yes delete book',
            cancelButtonText:'cancel'
        })
        if(confrimDelete.isConfirmed){
            try {
                const deleteBook= await axios.delete(`http://127.0.0.1:3004/booksRoute/deletebook/${id}`)
                if(deleteBook.data){
                    toast.success('book deleted successfully')
                    
                }
            } catch (error) {
                toast.error('unable to delete book')
            }
        }
    }
  return (
    <>
    <Adminlinks/>
    <div className='booklisttile'>
        <h2>list of books in stock</h2>
    </div>
    <div className='booklist'>
        <table>
            <thead>
                <tr>
                    <th>picture</th>
                    <th>name</th>
                    <th>author</th>
                    <th>category</th>
                    <th>price</th>
                    <th>stoke</th>
                    <th>actions</th>
                </tr>
            </thead>
            <tbody>
                {allBooks.map((book,index)=>(
                    <tr key={index}>
                        <td><img src={book.picture} alt='' height='120px'></img></td>
                        <td>{book.name}</td>
                        <td>{book.author}</td>
                        <td>{book.category}</td>
                        <td>{book.price}</td>
                        <td>{book.stoke}</td>
                        <td className='booklistbtn'>
                            <Link to={`/editbook/${book._id}`}><button>edit book details</button></Link>
                            <button onClick={()=>{deleteBook(book._id)}}>delete book</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    </>
  )
}

export default Booklist
