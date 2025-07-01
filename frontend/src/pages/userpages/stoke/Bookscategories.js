import React, { useContext } from 'react'
import { AppContext } from '../../../context/AppContext'
import { Link } from 'react-router-dom'
import Item from './Item'

const Bookscategories = (props) => {
  const{allBooks}=useContext(AppContext)

  return (
    <>
    <div className='categorymenu'>
      <div className='categoryname'>
        <h2>{props.category} category</h2>
      </div>
      <div className='categorycontent'>
        {allBooks && allBooks.map((books,index)=>{
          if(props.category === books.category){
            return <Link to="/" key={index}><Item picture={books.picture} name={books.name}/></Link>
          }else{
            return null
          }
        })}
      </div>
    </div>
    </>
  )
}

export default Bookscategories
