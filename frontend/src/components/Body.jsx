import { useEffect, useState } from 'react'
import { fetchBooksList } from '../api'
import BookList from './BookList'
import SearchAndFilter from './SearchAndFilter'

function Body() {
    const [bookList, setBookList] = useState([])
    const [isBookListApiLoad, setIsBookListApiLoad] = useState(false)
    const [filteredBookList, setFilteredBookList] = useState([])

    useEffect(() => {
        async function loadBookList() {
            try {
                const bookListResponse = await fetchBooksList()
                setBookList(bookListResponse)
                setFilteredBookList(bookListResponse)
            } catch (err) {
                console.log("Error occured")
                setBookList([])
            } finally {
                setIsBookListApiLoad(true)
            }
        }
        loadBookList()
    }, [])

    return (
        <>
            <SearchAndFilter setList={setFilteredBookList} originalBookList={bookList}/>
            <BookList list={filteredBookList} isBookListApiLoad={isBookListApiLoad} />
        </>
    )
}

export default Body