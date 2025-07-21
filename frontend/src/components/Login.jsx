import { Link, useNavigate } from 'react-router'
import useForm from "../utility/useForm"
import { labelStyle, inputStyle, buttonStyle } from "../css"
import { loginUser } from '../api/index'
import { useState } from 'react'


const initialformValue = {
    emailId: { description: 'EmailId', value: '' },
    password: { description: 'Password', value: '' }
}

const Login = (props) => {
    const [disableLoginlearBtnGrp, setDisableLoginlearBtnGrp] = useState(false)

    const { formValue, handleOnChange, handleOnReset } = useForm(initialformValue)
    const { setIsLogin, setUserDetails } = props
    const navigate = useNavigate()

    function handleCancelClick(e) {
        navigate('/')
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setDisableLoginlearBtnGrp(true)
            const payload = {
                email_id: formValue.emailId.value,
                password: formValue.password.value
            }
            const response = await loginUser(payload)
            if (response.status === 200) {
                alert('Logged in successfull');
                setIsLogin(true)
                setUserDetails(response.data)
                navigate('/')
            } else if (response.status === 404) {
                alert("Email Id not found")
            } else if (response.code === 401) {
                alert("Incorrect emailId or password")
            }
        } catch (err) {
            alert("Something failed while validation")
        } finally {
            handleOnReset()
            setDisableLoginlearBtnGrp(false)
        }
    }

    return (
        <div className="flex flex-row justify-center items-start w-screen">
            <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-md mt-8">
                <div className="flex justify-end w-[100%] mt-6 mr-11 mb-0">
                    <button type="button" onClick={handleCancelClick} >❌</button>
                </div>
                <div className="px-16 pt-2 pb-12">
                    <div className="flex flex-row justify-center w-auto px-24 mb-4">
                        <h1 className="font-semibold text-blue-500 ">Login</h1>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-fit h-fit gap-4">
                        {Object.keys(formValue)?.map((i) => {
                            return (
                                <div key={formValue[i].description} className="flex flex-col gap-2">
                                    <label className={`${labelStyle} text-center`}>{formValue[i].description}</label>
                                    <input name={i} type={i === "password" ? "password" : "text"} value={formValue[i].value} onChange={handleOnChange} className={inputStyle} required />
                                </div>
                            )
                        })}
                        <p>*All Fields are required</p>
                        <div className="flex gap-4">
                            <button type="button" className={`${buttonStyle} ${disableLoginlearBtnGrp ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : ''}`} onClick={handleOnReset} disabled={disableLoginlearBtnGrp}>Clear</button>
                            <button type="submit" className={`${buttonStyle} ${disableLoginlearBtnGrp ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : ''}`} disabled={disableLoginlearBtnGrp}>Submit</button>
                        </div>
                        <h2 className="font-semibold text-blue-500 ">For new user, create new profile <Link to="/signup" className="text-red-500">here</Link></h2>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login