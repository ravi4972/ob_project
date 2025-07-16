import { useNavigate } from 'react-router'
import { buttonStyle } from "../css"

function Headers(props) {
    const navigate = useNavigate()
    const { isLogin } = props
    const headerButtons = isLogin ? ["Home", "Cart", "Contact Us", "My Profile"] : ["Home", "Contact Us", "Login"]

    function handleLogoClick(){
        navigate('/')
    }

    function handleOnClick(e) {
        switch (e.target.name) {
            case "Home":
                navigate("/")
                break
            case "Cart":
                navigate("/cart")
                break
            case "Contact Us":
                navigate("/contact-us")
                break
            case "My Profile":
                navigate("/user-profile")
                break
            case "Login":
                navigate("/login")
                break
        }
    }

    return(
        <div className="flex flex-row w-full m-0 p-0 py-6 bg-blue-200 bg-[url('https://www.transparenttextures.com/patterns/checkered-pattern.png')] sticky top-0 shadow-lg shadow-blue-300 z-50 ">
            <div className='flex flex-row w-[50%] px-12'>
                <h1 className="text-5xl font-pacifico tracking-wide text-indigo-600 drop-shadow-md cursor-pointer" onClick={handleLogoClick}>
                     Book<span className="text-purple-500 font-bold">Lo</span>
                 </h1>
            </div>
            <div className='w-[50%] flex justify-end pr-16'>
                <ul className="flex flex-row gap-4">
                 {headerButtons.map((i) => {
                     return (
                         <li key={i}>
                             <button name={i} className={buttonStyle} onClick={handleOnClick}>{i}</button>
                         </li>
                     )
                 })}
             </ul>
            </div>
        </div>
    )
}

export default Headers