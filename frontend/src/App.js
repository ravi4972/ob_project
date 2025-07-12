import ReactDom from 'react-dom/client'
import {useState} from 'react'
import {BrowserRouter, Routes, Route, Outlet} from 'react-router'
import Headers from './components/Header'
import SignUp from './components/Singup'
import Login from './components/Login'
import Body from './components/Body'
import PageNotFound from './components/PageNotFound'

function Layout({isLogin, userDetails}){
    return(
        <div>
            <Headers isLogin={isLogin} userDetails={userDetails}/>
            <Outlet/>
        </div>
    )
}

function App(){
    const [isLogin, setIsLogin] = useState(false)
    const [userDetails, setUserDetails] = useState({})
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout isLogin={isLogin} userDetails={userDetails}/>}>
                    <Route index element={<Body/>}/>
                    <Route path="login" element={<Login setIsLogin={setIsLogin} setUserDetails={setUserDetails}/>}/>
                    <Route path="signup" element={<SignUp/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                </Route>
            </Routes> 
        </BrowserRouter>
    )
}

const root = ReactDom.createRoot(document.getElementById("root"))
root.render(<App/>)