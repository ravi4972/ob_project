import { useEffect, useState } from 'react'
import {fetchBooksList} from '../api'
import {bodyBackGround} from '../css/index'
import useOfflineStatus from '../utility/useOfflineStatus'
import BookList from './BookList'
import Offline from './Offline'

function Body(){
    const [bookList, setBookList] = useState([])
    const [isBookListApiLoad,setIsBookListApiLoad ] = useState(false)

    const isOffline = useOfflineStatus()

    useEffect(()=>{
        async function loadBookList(){
            try{
                const bookListResponse = await fetchBooksList()
                setBookList(bookListResponse)
                setIsBookListApiLoad(true)
            } catch(err){
                console.log("Error occured")
                setBookList([])
            } finally{
                setIsBookListApiLoad(true)
            }
        }
        if(!isOffline){
            loadBookList()
        }
    },[isOffline])

    return(
        isOffline? <Offline/>:
        <div className={`${bodyBackGround}`}>
            <BookList list={bookList} isBookListApiLoad={isBookListApiLoad}/>
        </div>
    )
}

export default Body