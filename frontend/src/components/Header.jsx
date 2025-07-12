import { useNavigate } from 'react-router'
import { buttonStyle } from "../css"

function Headers(props) {
    const navigate = useNavigate()
    const { isLogin, userDetails } = props
    console.log('userDetails',userDetails)
    const headerButtons = isLogin ? ["Home", "Cart", "Contact Us", "My Profile"] : ["Home", "Contact Us", "Login"]

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
    return (
        <div className="flex flex-row justify-end bg-blue-200 bg-[url('https://www.transparenttextures.com/patterns/checkered-pattern.png')] py-10 px-4 sticky top-0 shadow-lg shadow-blue-300 z-50">
            {isLogin ? <h1 className="text-blue-700 text-md font-bold p-2 mr-4">{`Welcome ${userDetails?.user?.name}`}</h1> : ''}
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
    )
}

export default Headers