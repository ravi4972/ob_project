import { useEffect, useState } from "react"
import { getBookReview } from "../api/index"

export default function BookReview ({id,isLogin}){
    const [reviewDetails, setReviewDetails] = useState([])
    const [rating, setRating] = useState('')

    useEffect(()=>{
        async function fetchBookReviews(){
            const {data} = await getBookReview(id)
            console.log(data)
            const calRating = data.length && Math.round((data.reduce((acc, i) => acc + i.rating, 0) / data.length) * 10) / 10;
            console.log(calRating)
            setRating(calRating)
            setReviewDetails(data)
        }
        fetchBookReviews()
    },[])
    
    return(
        <div className="flex flex-col justify-start items-start h-full p-4">
            <h1 className="text-lg font-bold text-blue-500 p-2 mb-4">Ratings⭐️ & Reviews✍🏻 ({rating}/5)</h1>
            <div className="flex flex-col justify-start items-start gap-2 overflow-y-auto h-[40%] w-full">
                {
                    reviewDetails.map((i)=>{
                        return(
                            <div className="w-full flex flex-col gap-2 bg-white p-2 shadow-md rounded-md">
                                <h1 className="text-lg break-words whitespace-pre-wrap">{i.review}</h1>
                                <h2 className="text-sm bg-slate-200 w-fit p-1">By: {i.name} {new Date(i.created_at).toLocaleDateString('en-IN')}</h2>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}