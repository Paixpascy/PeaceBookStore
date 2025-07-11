
import React from 'react'
import { Navigate } from 'react-router-dom'

const Protectedroute = ({children}) => {
    const role=localStorage.getItem('role')
    if(role !=='admin'){
        return <Navigate to='/'/>
    }
    return children
}

export default Protectedroute
