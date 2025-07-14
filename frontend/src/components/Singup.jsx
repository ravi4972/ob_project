import {useNavigate} from 'react-router'
import { labelStyle, inputStyle, buttonStyle } from "../css"
import useForm from '../utility/useForm'
import {createUser} from '../api/index'

const initialformValue = {
        fullName:{description:'Full Name',value:''},
        contact:{description:'Contact',value:''},
        email:{description:'Email',value:''},
        password:{description:'Password',value:''}
    }

const SignUp = ()=>{
    const {formValue,handleOnChange,handleOnReset} = useForm(initialformValue)
    const navigate = useNavigate()
    async function handleSubmit(e){
        try{
            e.preventDefault()
            const payload = {
                "name": formValue['fullName'].value,
                "email_id": formValue['email'].value,
                "contact": formValue['contact'].value,
                "password": formValue['password'].value
            }
            const response = await createUser(payload)
            if(response.status===200){
                alert('User created!');
                navigate('/login')
            }
        }catch(err){
            alert('Error Occured while sign up, Please try after some time')
        } finally{
            handleOnReset()
        }
    }

    return(
        <div className={`w-auto min-h-screen overflow-hidden bg-blue-50 flex flex-row justify-center p-14`}>   
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-fit h-fit px-16 py-7 bg-white rounded-lg shadow-md gap-4">
                <h1 className="font-semibold text-blue-500 ">Create Profile</h1>
                {Object.keys(formValue)?.map((i)=>{
                    return(
                        <div key={formValue[i].description} className="flex flex-col gap-2">
                            <label className={`${labelStyle} text-center`}>{formValue[i].description}</label>
                            <input name={i} type={i==="password"?"password":"text"} value={formValue[i].value} onChange={handleOnChange} className={inputStyle} required/>  
                        </div>
                    )
                })}
                <p>*All Fields are required</p>
                <button type="submit" className={buttonStyle}>Submit</button>
            </form>
        </div>
    )
}

export default SignUp