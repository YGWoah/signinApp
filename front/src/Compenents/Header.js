import React, { useState } from 'react'
import Login from './Login'
import Profile from './Profile'
import SignIn from './SignIn'
import './styles/header.css'

const Header = () => {
    const initialLocation = {
        signIn:false,
        login:false
    }
    const [location,setLocation] = useState(initialLocation)
    const forLogin = ()=>{
        setLocation({...initialLocation,
        login:true})
        console.log("hello")
    }

    const forSignin = ()=>{
        setLocation({...initialLocation,
        signIn:true})
    }

    
    return (
            <div>
                <div className="header">
                    <ul>
                        <li  id="home" className="line different"  onClick={()=>{forLogin()}}>Login</li>
                        <li id="course" className="different" onClick={()=>{forSignin()}} >Sign In</li>
                    </ul>
                </div>
                {(location.login)?(<Login/>):""}
                {(location.signIn)?(<SignIn/>):""}                                      

            </div>
            )
    
}

export default Header