import { useEffect, useState } from 'react'
import {useParams} from 'react-router'
import {getBookUsingID} from '../api'
import {smButtonStyle} from '../css/index'
import NoBookAvailable from './NoBookAvailable'

export default function Book({label}){
    const [bookDetails, setBookDetails] = useState('')
    const {id} = useParams()
    label='ajnd'

    useEffect(()=>{
        async function fetchBookDetails(){
            try{
                const response = await getBookUsingID(id)
                setBookDetails(response.data)
            } catch(err){
                alert("Book fetch got failed")
            } 
        }
        if(id){
            fetchBookDetails()
        }
    },[])

    return(
            bookDetails.id ?
            <div className="flex flex-col justify-start items-start shadow-sm bg-white h-full">
                <div className="flex flex-row justify-start items-start w-full p-4 gap-4">
                    <div className='w-1/3'>
                        <img src={bookDetails.image_link} className="w-full relative"/>
                        {label && <h1 className="absolute top-2 right-2 bg-yellow-400 text-white text-xs px-3 py-1 rounded z-10">Promoted</h1>}
                    </div>
                    <div className="flex flex-col justify-center items-start gap-4 shadow-md w-1/6 h-full p-4 text-left">
                        <h1 className='font-bold'>{bookDetails.name}</h1>
                        <h1>✍🏻 By: {bookDetails.author}</h1>
                        <h1>📖 Available in: {bookDetails.language}</h1>
                        <h1>₹ Price: {bookDetails.price}</h1>
                        <div className="flex felx-row gap-2">
                            <button className={`${smButtonStyle}`}>Add to Cart</button>
                            <button className={`${smButtonStyle}`}>Buy Now</button>
                        </div>
                        {bookDetails.quantity<=3?<h1>🔴 Low in stock 🔴</h1>:''}
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4 shadow-md w-1/2 h-full p-4">
                        <h1>About this Book</h1>
                        <h1>{bookDetails.description}</h1>
                    </div>
                </div>
            </div>
            :
            <NoBookAvailable/>
    )
}

function PromotedBook(label){
    return
}