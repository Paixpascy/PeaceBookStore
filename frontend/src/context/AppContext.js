
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'


export const AppContext=createContext()
const AppContextProvider = (props) => {

    const[isLoggedIn,setisLoggedin]=useState(false)
    const[allBooks,setAllBooks]=useState({})

    useEffect(()=>{
        axios.get('http://127.0.0.1:3004/booksRoute/getbooks')
        .then((response)=>{
            setAllBooks(response.data.data)
        })
    },[])

    const conntextValue={isLoggedIn,setisLoggedin,allBooks,setAllBooks}
  return (
    <div>
      <AppContext.Provider value={conntextValue}>
        {props.children}
      </AppContext.Provider>
    </div>
  )
}

export default AppContextProvider
