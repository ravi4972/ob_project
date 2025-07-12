import axios from 'axios'
const baseUrl = 'https://ob-project.onrender.com'

export const createUser = async (input)=>{
    const response = await axios.post(`${baseUrl}/user`,input)
    return response
}

export const fetchBooksList = async (input)=>{
    const response = await axios.get(`${baseUrl}/books`)
    return response.data
}

export const loginUser = async (input)=>{
    const response = await axios.post(`${baseUrl}/login`,input)
    return response
}

export const fetchUserDetailsUsingId = async (id)=>{
    const response = await axios.get(`${baseUrl}/user/${id}`)
    return response
}
