import React from 'react'
import './styles/loginStyles.css'
import  { useState } from 'react'
import './style.css'
import axios from 'axios'
import Profile from './Profile'


const Login = () => {

    const [loginInfo,setLoginInfo] = useState({
        email:'',password:''
    })
    const [isLogged,setIsLogged] = useState(false)
    const [id,setId] = useState(0)
    const handleSubmit = async ()=>{
        await axios.post('/login',loginInfo)
        .then((res)=>{
            console.log(res.data.id)
            setId(res.data.id)
        }).catch((error)=>{
            console.log(error);
        })
        setIsLogged(true)
    }

    const handleEmailChange = (e)=>{
        let tempEmail = e.target.value
        setLoginInfo({...loginInfo,email:tempEmail})
    }

    const handlePasswordchange = (e)=>{
        let tempPassword = e.target.value
        setLoginInfo({...loginInfo,password:tempPassword})
    }


  return (
    <div>
        {!isLogged?(<div className="big-container">
                      <div className="container flex-row">
                          
                          <div className="chiaar">
                              <div className="big-chiaar">
                                  <h3>
                                      Welcome again<span >.</span>
                                  </h3>
                              </div>
                              <div className="small-chiaar">
                                  <p>
                                      Don't have an account? <span><a href="signIn.html">Sign up</a></span>
                                  </p>
                              </div>
                              <form className="signInForm">
                                  <input type="email" name="email" placeholder="email@exemple.com" onChange={handleEmailChange} required/>
                                  <input type="password" name="password" placeholder="Password" onChange={handlePasswordchange} required/>
                                  <input type="button" value="Register" onClick={handleSubmit} />
                                  <br/>
                              </form>
                          </div>
                      </div>
                  </div>):<Profile id={id}/>}
    </div>
  )
}

export default Login



