import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'


const Bookdetails = () => {
    const{allBooks,addToCart,cartData}=useContext(AppContext)
    const[singleBook,setSingleBook]=useState()
    const[qtyDesired,setQtyDesired]=useState(0)

    const{bkid}=useParams()
    useEffect(()=>{
        if(allBooks && allBooks.length > 0){
        const bookkDetails=allBooks.find((e)=>e._id === bkid)
        if(bookkDetails){
            setSingleBook(bookkDetails)
        }else{
            toast.error('book not found')
        }
    }
  
    },[bkid,allBooks])

    if(!singleBook){
        <p>book details loading.....</p>
        return;
    }

    const CurrentQty=cartData[singleBook._id] || 0;
    const remainingStoke=singleBook.stoke - CurrentQty;
    const outOfStock=remainingStoke <=0;

    const handleQuantity=((e)=>{
        const item=Number(e.target.value)
        if(item >=1 && item <= remainingStoke){
            setQtyDesired(item)
        }
    })
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
        <p>amount left:{remainingStoke}</p>
        <label>desired amount</label>
        <select max={remainingStoke} value={qtyDesired} onChange={handleQuantity}>
            {[...Array(singleBook.stoke +1).keys()].map((val)=>(
                <option key={val} value={val}>{val}</option>
            ))}
        </select>
        </div>
        <div className='cartadd'>
            {outOfStock?(
                <p>finished</p>
            ):
            <button onClick={()=>{
                if(qtyDesired ===0 ){
                    toast.error('please add quantity')
                    return;
                }
                addToCart(singleBook._id,qtyDesired);
                toast.success('product added')
            }}>add to cart</button>}
        </div>
    </div>
    </>
    ):(<p>book not available</p>)

  )
}

export default Bookdetails
