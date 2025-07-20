import { useNavigate } from 'react-router'
import { labelStyle, inputStyle, buttonStyle } from "../css"
import useForm from '../utility/useForm'
import { createUser } from '../api/index'

const initialformValue = {
    fullName: { description: 'Full Name', value: '' },
    contact: { description: 'Contact', value: '' },
    email: { description: 'Email', value: '' },
    password: { description: 'Password', value: '' }
}

const SignUp = () => {
    const { formValue, handleOnChange, handleOnReset } = useForm(initialformValue)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const payload = {
                name: formValue.fullName.value,
                email_id: formValue.email.value,
                contact: formValue.contact.value,
                password: formValue.password.value
            }
            const response = await createUser(payload)
            if (response.status === 200) {
                alert('User created!')
                navigate('/login')
            }
        } catch (err) {
            alert('Error occurred while signing up. Please try again later.')
        } finally {
            handleOnReset()
        }
    }

    function handleCancelClick() {
        navigate('/')
    }
    
    return (
        <div className="flex justify-center items-start pt-8">
            <div className="flex flex-col justify-start items-center bg-white rounded-lg shadow-lg">
                <div className='flex justify-end w-[100%] pr-4 pt-4'>
                    <button type="button" onClick={handleCancelClick}>❌</button>
                </div>
                <div className='flex flex-col justify-start items-center px-20 pb-8'>
                    <h1 className='text-xl font-semibold text-blue-500 mb-2'>Sign Up</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                         {Object.keys(formValue)?.map((key) => (
                             <div key={formValue[key].description} className="flex flex-col gap-2">
                                 <label className={`${labelStyle} text-left`}>{formValue[key].description}</label>
                                 <input
                                     name={key}
                                     type={key === "password" ? "password" : "text"}
                                     value={formValue[key].value}
                                     onChange={handleOnChange}
                                     className={inputStyle}
                                     required
                                 />
                             </div>
                         ))}
                         <p className="text-sm text-gray-500 italic">*All fields are required</p>
                         <button type="submit" className={buttonStyle}>Submit</button>
                     </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp
