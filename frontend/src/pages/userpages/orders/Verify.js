import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Userlinks from '../../../routes/userroutes/Userlinks'
import './Verify.css'

const Verify = () => {
    const[searchParams]=useSearchParams()
    const success=searchParams.get('success')
  return (
    <>
    <Userlinks/>
    <div className='verify'>
        {success==="true"?(
            <div className='verifytrue'>
                <h1>payment successful</h1>
                <p>check your orders page for confirmation</p>
                <button><Link to='/myorders'>orders page</Link></button>
            </div>
        ):(
            <div className='verifyfalse'>
                <Userlinks/>
                <h1>payment failed</h1>
                <p>please try again</p>
            </div>
        )}
    </div>
    </>
  )
}

export default Verify
