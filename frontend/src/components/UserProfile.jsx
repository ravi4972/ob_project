import { useEffect, useState } from "react"
import useForm from "../utility/useForm"
import {fetchUserDetailsUsingId} from '../api'
import {bodyBackGround, inputStyle, labelStyle, buttonStyle} from '../css'
import useForm from "../utility/useForm"
import {useNavigate} from 'react-router'

const UserProfile =({userId, isLogin, setIsLogin, resetUserDetail})=>{
    const [userDetails, setUserDetails] = useState(null)
    const navigate = useNavigate()

    const {formValue,handleOnChange,setFormValue} = useForm({
        name: { description: 'Name', value: userDetails?.name || '' },
        age: { description: 'Age', value: userDetails?.age || ''},
        emailId: { description: 'Email Id', value: userDetails?.email_id || '' },
        contact: { description: 'Contact', value: userDetails?.contact || '' },
    })

    useEffect(()=>{
        try{
            async function fetchUserDetails(){
                setTimeout(async()=>{
                    const {data} = await fetchUserDetailsUsingId(userId)
                    const {password:_, ...userDetails} =data
                    setUserDetails(userDetails)
                },5000)
            }
            if(isLogin){
                fetchUserDetails()
            }else{
                navigate('/')
            }
        }catch(err){
            navigate('/')
        }
    },[])  

    useEffect(()=>{
        setFormValue({
        name: { description: 'Name', value: userDetails?.name || '' },
        age: { description: 'Age', value: userDetails?.age || ''},
        emailId: { description: 'Email Id', value: userDetails?.email_id || '' },
        contact: { description: 'Contact', value: userDetails?.contact || '' },
    })
    },[userDetails])
    
    if(!userDetails){
        return <div className={`w-auto min-h-screen overflow-hidden bg-blue-50 flex flex-row justify-center p-14 ${bodyBackGround}`}>
            <h1>Loading details...</h1>
        </div>
    }

    function handleSubmit(){
        console.log('Send edited')
    }

    function handleCancelClick(){
        navigate('/')
    }

    function handleLogOutClick(){
        setIsLogin(false)
        // resetUserDetail(null)
        navigate('/')
    }

    return(
        <div className={`w-auto min-h-screen overflow-hidden bg-blue-50 flex flex-row justify-center p-14 ${bodyBackGround}`}>
            <form className="flex flex-col justify-center items-center w-fit h-fit px-16 py-7 bg-white rounded-lg shadow-md gap-4">
                <h1 className="font-semibold text-blue-500 ">My Profile</h1>
                {Object.keys(formValue)?.map((i) => {
                    return (
                        <div key={formValue[i].description} className="flex flex-row gap-2">
                            <label className={`${labelStyle} text-center`}>{formValue[i].description}</label>
                            <input name={i} type={i === "password" ? "password" : "text"} value={formValue[i].value} onChange={handleOnChange} className={inputStyle} required />
                        </div>
                    )
                })}
                <p>*All Fields are required</p>
                <div className="flex flex-row gap-4">
                    <button type="button" className={`${buttonStyle} border-red-700 hover:bg-red-100 text-red-700`} onClick={handleCancelClick}>Cancel</button>
                    <button type="button" className={buttonStyle}>Edit</button>
                    <button type="button" className={buttonStyle} onClick={handleLogOutClick}>Log Out</button>
                </div>
            </form>
        </div>
    )
}

export default UserProfile