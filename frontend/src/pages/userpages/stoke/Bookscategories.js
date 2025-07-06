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
        {allBooks && allBooks.map((books)=>{
          if(props.category === books.category){
            return <Link to={`/bookdetails/${books._id}`} key={books._id}><Item picture={books.picture} name={books.name}
            author={books.author} category={books.category} price={books.price} stoke={books.stoke}/></Link>
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
