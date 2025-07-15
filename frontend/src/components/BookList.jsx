import BookListShimmer from '../shimmerComponents/BookListShimmer'
import BookCard,{withPromotedLabel} from "./BookCard"
import NoBookAvailable from './NoBookAvailable'

const BookList =(props)=>{
    const {list, isBookListApiLoad} = props
    const PromotedBookCard = withPromotedLabel("Promoted")(BookCard)
    return (
        <div className={`flex flex-row justify-start items-start gap-8 flex-wrap p-8 pl-12`}>
            {
                !isBookListApiLoad?<BookListShimmer/>:
                !list.length? <NoBookAvailable/>:
                list?.map((book)=>{
                    return(
                        book.is_promoted? <PromotedBookCard key={book.id} book={book}/> : <BookCard key={book.id} book={book}/>
                    )
                })
            }
        </div>
    )
}

export default BookList