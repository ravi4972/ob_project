import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getBookUsingID } from '../api'
import { smButtonStyle } from '../css/index'
import NoBookAvailable from './NoBookAvailable'
import BookReview from './BookReview'

export default function Book({ label }) {
    const [bookDetails, setBookDetails] = useState('')
    const [isBookDetailsApiSuccess, setIsBookDetailsApiSuccess] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchBookDetails() {
            try {
                const response = await getBookUsingID(id)
                setBookDetails(response.data)
                setIsBookDetailsApiSuccess(true)
            } catch (err) {
                alert("Book fetch got failed")
            }
        }
        if (id) {
            fetchBookDetails()
        }
    }, [])

    function handleBackButtonClick() {
        navigate('/')
    }

    if (!isBookDetailsApiSuccess) {
        return (
            <h1>Loading.....</h1>
        )
    }

    return (
        bookDetails.id ?
            <div className='flex flex-row justify-start items-start '>
                <div className='w-[60%] bg-blue-50 h-screen'>
                    <button className={`${smButtonStyle} m-4`} onClick={handleBackButtonClick}>Back ⬅️</button>
                    <div className='flex flex-col gap-4 justify-start items-start py-2 px-4'>
                        <div className='flex flex-row justify-start items-start gap-4 h-80 w-full'>
                            <img src={bookDetails.image_link} className="h-80 w-[500px]" />
                            <div className='flex-1 flex flex-col justify-center items-start h-full gap-4 py-8 px-8 bg-white shadow-md rounded-md'>
                                <h1 className='font-bold'>{bookDetails.name}</h1>
                                <h1>✍🏻 By: {bookDetails.author}</h1>
                                <h1>📖 Available in: {bookDetails.language}</h1>
                                <h1>₹ Price: {bookDetails.price}</h1>
                                <div className="flex felx-row gap-2">
                                    <button className={`${smButtonStyle}`}>Add to Cart</button>
                                    <button className={`${smButtonStyle}`}>Buy Now</button>
                                </div>
                                {bookDetails.quantity <= 3 ? <h1>🔴 Low in stock 🔴</h1> : ''}
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 py-4 px-4'>
                            <h1 className='text-center font-bold'>About this Book</h1>
                            <h1>{bookDetails.description}</h1>
                        </div>
                    </div>
                </div>
                <div className='w-[40%] bg-blue-50 h-screen'>
                    <BookReview id={id} isLogin={true}/>
                </div>
            </div>
            : <NoBookAvailable />
    )

    // return(
    //         bookDetails.id ?
    //         <div className='flex flex-row justify-start items-start'>
    //             <div className='w-1/6 bg-red-200 h'>
    //                 <
    //             </div>
    //         </div>

    //         <div className="flex flex-col justify-start items-start">
    //             <div className='flex justify-start items-center w-[100%] my-4 mx-4'>
    //                 <button className={smButtonStyle} onClick={handleBackButtonClick}>⬅️ Back</button>
    //             </div>
    //             <div className="flex flex-row justify-start items-start w-full p-4 gap-4">
    //                 <div className='w-1/3'>
    //                     <img src={bookDetails.image_link} className="w-full relative"/>
    //                     {label && <h1 className="absolute top-2 right-2 bg-yellow-400 text-white text-xs px-3 py-1 rounded z-10">Promoted</h1>}
    //                 </div>
    //                 <div className="flex flex-col justify-center items-start gap-4 shadow-md w-1/6 h-full p-4 text-left bg-blue-50">
    //                     <h1 className='font-bold'>{bookDetails.name}</h1>
    //                     <h1>✍🏻 By: {bookDetails.author}</h1>
    //                     <h1>📖 Available in: {bookDetails.language}</h1>
    //                     <h1>₹ Price: {bookDetails.price}</h1>
    //                     <div className="flex felx-row gap-2">
    //                         <button className={`${smButtonStyle}`}>Add to Cart</button>
    //                         <button className={`${smButtonStyle}`}>Buy Now</button>
    //                     </div>
    //                     {bookDetails.quantity<=3?<h1>🔴 Low in stock 🔴</h1>:''}
    //                 </div>
    //                 <div className="flex flex-col justify-center items-center gap-4 shadow-md w-1/2 h-full p-4 bg-yellow-50">
    //                     <h1>About this Book</h1>
    //                     <h1>{bookDetails.description}</h1>
    //                 </div>
    //             </div>
    //         </div>
    //         :
    //         <NoBookAvailable/>
    // )
}