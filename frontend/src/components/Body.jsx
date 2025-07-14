import { useEffect, useState } from 'react'
import {fetchBooksList} from '../api'
import BookList from './BookList'

function Body(){
    const [bookList, setBookList] = useState([])
    const [isBookListApiLoad,setIsBookListApiLoad ] = useState(false)

    useEffect(()=>{
        async function loadBookList(){
            try{
                const bookListResponse = await fetchBooksList()
                setBookList(bookListResponse)
            } catch(err){
                console.log("Error occured")
                setBookList([])
            } finally{
                setIsBookListApiLoad(true)
            }
        }
        loadBookList()
    },[])

    return(
        <BookList list={bookList} isBookListApiLoad={isBookListApiLoad}/>
    )
}

export default Body