import { useEffect, useState } from "react"
import useForm from "../utility/useForm"
import { fetchUserDetailsUsingId, updateUserProfile } from '../api'
import { inputStyle, labelStyle, buttonStyle } from '../css'
import { useNavigate } from 'react-router'

const UserProfile = ({ userId, isLogin, setIsLogin }) => {
    const [userDetails, setUserDetails] = useState(null)
    const [disableLoginlearBtnGrp, setDisableLoginlearBtnGrp] = useState(false)
    const navigate = useNavigate()

    const { formValue, handleOnChange, setFormValue } = useForm({
        name: { description: 'Name', value: userDetails?.name || '' },
        age: { description: 'Age', value: userDetails?.age || '' },
        emailId: { description: 'Email Id', value: userDetails?.email_id || '' },
        contact: { description: 'Contact', value: userDetails?.contact || '' },
    })

    useEffect(() => {
        try {
            async function fetchUserDetails() {
                setTimeout(async () => {
                    const { data } = await fetchUserDetailsUsingId(userId)
                    const { password: _, ...userDetails } = data
                    setUserDetails(userDetails)
                }, 100)
            }
            if (isLogin) {
                fetchUserDetails()
            } else {
                navigate('/')
            }
        } catch (err) {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        setFormValue({
            name: { description: 'Name', value: userDetails?.name || '' },
            age: { description: 'Age', value: userDetails?.age || '' },
            emailId: { description: 'Email Id', value: userDetails?.email_id || '' },
            contact: { description: 'Contact', value: userDetails?.contact || '' },
        })
    }, [userDetails])

    if (!userDetails) {
        return <div className={`w-auto min-h-screen overflow-hidden bg-blue-50 flex flex-row justify-center p-14`}>
            <h1>Loading details...</h1>
        </div>
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setDisableLoginlearBtnGrp(true)
            const name = formValue.name.value
            const age = formValue.age.value
            const contact = formValue.contact.value
            const response = await updateUserProfile(userId, { name, age, contact })
            if (response.status === 200) {
                alert('Profile got updated')
                navigate('/')
            } else {
                alert('Something failed while updating your profile')
            }
        } catch (err) {
            alert('Something failed while updating your profile')
            setDisableLoginlearBtnGrp(false)
        }
    }

    function handleCancelClick() {
        setDisableLoginlearBtnGrp(true)
        navigate('/')
    }

    function handleLogOutClick() {
        setDisableLoginlearBtnGrp(true)
        setIsLogin(false)
        navigate('/')
    }

    return (
        <div className="flex flex-row justify-center items-start w-screen">
            <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-md mt-8">
                <div className="flex justify-end w-[100%] mt-6 mr-11 mb-0">
                    <button type="button" onClick={handleCancelClick} >❌</button>
                </div>
                <div className="px-16 pt-2 pb-12">
                    <div className="flex flex-row justify-center w-auto px-24 mb-4">
                        <h1 className="font-semibold text-blue-500">My Profile</h1>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-fit h-fit gap-4">
                        {Object.keys(formValue)?.map((i) => {
                            return (
                                <div key={formValue[i].description} className="flex flex-row gap-2">
                                    <label className={`${labelStyle} text-center`}>{formValue[i].description}</label>
                                    <input name={i} type={i === "password" ? "password" : "text"} value={formValue[i].value} onChange={handleOnChange} className={`${inputStyle} ${i === 'emailId' ? 'bg-gray-200' : ''} `} required disabled={i === 'emailId'} />
                                </div>
                            )
                        })}
                        <p>*All Fields are required</p>
                        <div className="flex flex-row gap-4">
                            <button type="submit" className={`${buttonStyle} ${disableLoginlearBtnGrp ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : ''}`} disabled={disableLoginlearBtnGrp}>Save</button>
                            <button type="button" className={`${buttonStyle} ${disableLoginlearBtnGrp ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : ''}`} onClick={handleLogOutClick} disabled={disableLoginlearBtnGrp}>Log Out</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserProfile