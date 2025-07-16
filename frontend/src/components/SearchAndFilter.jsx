import { useState, useEffect } from 'react'
import { buttonStyle, inputStyle } from '../css'
import { getAuthorsList } from '../api'

export default function SearchAndFilter({ setList, originalBookList }) {
    const [searchText, setSearchText] = useState('')
    const [showAuthorDropDown, setShowAuthorDropDown] = useState(false)
    const [authorDropDownList, setAuthorDropDownList] = useState([])
    const [selectedAuthor, setSelectedAuthor] = useState('')

    useEffect(() => {
        const fetchAuthorsList = async () => {
            const response = await getAuthorsList()
            setAuthorDropDownList(response.data.map(i => i.author))
        }
        fetchAuthorsList()
    }, [])

    function handleInputChange(e) {
        const st = e.target.value
        setSearchText(st)
        setSelectedAuthor('')
        if (!st) {
            setList(originalBookList)
        }
        if (st.length >= 3) {
            const filteredList = originalBookList.filter((i) => {
                return (
                    i.name.toLowerCase().includes(st.toLowerCase())
                )
            })
            setList(filteredList)
        }
    }

    function handleAuthorSelection(author) {
        setSelectedAuthor(author)
        setSearchText('')
        const filteredList = originalBookList.filter((i) => {
            return (
                i.author.toLowerCase() === author.toLowerCase()
            )
        })
        setList(filteredList)
    }

    function handleOnHover() {
        console.log('Showing dropdown')
        setShowAuthorDropDown(true)
    }

    function handleOnReleaseHover() {
        setShowAuthorDropDown(false)
    }

    function handleAuthorFilterCancel(){
        setList(originalBookList)
        setSelectedAuthor('')
    }

    function handleClearSearchClick(){
        setSearchText('')
        setList(originalBookList)
    }

    const showSearchClear = searchText && !selectedAuthor

    return (
        <div className="flex justify-start items-center w-full h-auto p-2 mt-2 bg-blue-700">
            <input type="text" name="search" value={searchText} placeholder="Search using book name" className={`${inputStyle} ml-11 min-w-96 px-4`} onChange={handleInputChange} />
            {showSearchClear  && <button className={`${buttonStyle} mx-1 hover:bg-blue-500`} onClick={handleClearSearchClick}>❌</button>}
            <h1 className='text-white ml-10 mr-1'>Filter By:</h1>
            <div className='relative' onMouseEnter={handleOnHover} onMouseLeave={handleOnReleaseHover}>
                <button className={`${buttonStyle} text-white hover:bg-blue-500`}>Author{selectedAuthor ? `: ${selectedAuthor}` : ''}</button>
                {showAuthorDropDown && <div className='absolute bg-blue-700 z-50 rounded-lg flex flex-row flex-wrap w-96 h-auto p-4'>
                    {authorDropDownList.length ? authorDropDownList.map((i) => {
                        return (
                            <div key={i} className='text-white hover:bg-blue-500 pl-4 p-2 cursor-pointer rounded-lg w-auto' onClick={() => handleAuthorSelection(i)}>{i}</div>
                        )
                    })
                        : <div className='text-white hover:bg-blue-500 pl-4 p-2 cursor-pointer rounded-lg min-w-24 w-auto'>No Value</div>
                    }
                </div>
                }
            </div>
            {selectedAuthor && <button className={`${buttonStyle} hover:bg-blue-500`} onClick={handleAuthorFilterCancel}>❌</button>}
        </div>
    )
}