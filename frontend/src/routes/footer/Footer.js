
import React from 'react'
import { TiSocialInstagram } from "react-icons/ti";
import { FaFacebookSquare } from "react-icons/fa"
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <>
    <div className='footercontent'>
        <div className='contacts'>
            <p><TiSocialInstagram size='2rem'/>peacebkstore</p>
            <p><FaFacebookSquare size='2rem'/>peacebkstore</p>
            <p><FaSquareXTwitter size='2rem'/>peacebkstore</p>
            <p><MdEmail size='2rem'/>peacebkstore@gmail.com</p>
            <p><FaPhoneAlt size='2rem'/>+250787402048</p>
        </div>
        <div className='msg'>
            
        </div>
        &copy; peace book store
    </div>
    </>
  )
}

export default Footer
