import {Link, useNavigate} from 'react-router'
import useForm from "../utility/useForm"
import { labelStyle, inputStyle, buttonStyle } from "../css"
import {loginUser} from '../api/index'
import {bodyBackGround} from '../css'


const initialformValue = {
    emailId: { description: 'EmailId', value: '' },
    password: { description: 'Password', value: '' }
}

const Login = (props) => {
    const {formValue,handleOnChange,handleOnReset} = useForm(initialformValue)
    const {setIsLogin, setUserDetails} = props
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()
        try{
            const payload = {
                email_id: formValue.emailId.value,
                password: formValue.password.value
            }
            const response = await loginUser(payload)
            if(response.status===200){
                alert('Logged in successfull');
                setIsLogin(true)
                setUserDetails(response.data)
                navigate('/')
            } else if(response.status===404){
                alert("Email Id not found")
            } else if(response.code===401){
                alert("Incorrect emailId or password")
            }
        } catch(err){
            alert("Something failed while validation")
        }finally{
            handleOnReset()
        }
    }
    
    return (
        <div className={`w-auto min-h-screen overflow-hidden bg-blue-50 flex flex-row justify-center p-14 ${bodyBackGround}`}>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-fit h-fit px-16 py-7 bg-white rounded-lg shadow-md gap-4">
                <h1 className="font-semibold text-blue-500 ">Login</h1>
                {Object.keys(formValue)?.map((i) => {
                    return (
                        <div key={formValue[i].description} className="flex flex-col gap-2">
                            <label className={`${labelStyle} text-center`}>{formValue[i].description}</label>
                            <input name={i} type={i === "password" ? "password" : "text"} value={formValue[i].value} onChange={handleOnChange} className={inputStyle} required />
                        </div>
                    )
                })}
                <p>*All Fields are required</p>
                <button type="submit" className={buttonStyle}>Submit</button>
                <h2 className="font-semibold text-blue-500 ">For new user, create new profile <Link to="/signup" className="text-red-500">here</Link></h2>
            </form>
        </div>
    )
}

export default Login