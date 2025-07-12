const BookCard=(props)=>{
    const {book, label} = props
    return(
        <div className=" relative border rounded-lg p-4 shadow-sm bg-white flex flex-col items-center cursor-pointer w-[23%] min-w-[290px] h-80">
            {label}
            <img src={book.image_link} className='w-fit'/>
            <p className="text-lg font-semibold text-gray-800">
                {book.name}
            </p>
            <p className="text-sm text-gray-600">
                By:{book.author}
            </p>
            <p className="text-sm text-gray-500">
                LANGUAGE:{book.language}
            </p>
            <p className="text-md font-medium text-blue-600">
                ₹ {book.price}
            </p>
            <p className={`text-sm font-medium ${book.quantity>0 ? 'text-green-600':'text-red-600'}`}>
                {book.quantity>0?"In Stock":"Out of Stock"}
            </p>
        </div>
    )
}

export const withPromotedLabel =(label)=>{
    return (WrappedComponent)=>{
        return function PromotedBookCard(props){
            return(
                <WrappedComponent {...props} label={<h1 className="absolute top-2 right-2 bg-yellow-400 text-white text-xs px-3 py-1 rounded z-10">{label}</h1>} />
            )
        }
    }
}

export default BookCard