import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import "./login.css"
import { loginUser } from '../Actions/User.js'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const {loginError}=useSelector((state)=>state.like)
    const loginHandler = (e) => {
        e.preventDefault();
    
        dispatch(loginUser(email, password));
      };
      useEffect(()=>{
  
        if(loginError){
          dispatch({
            type:"clearErrors"
          })
        }
       
        
      },[loginError,dispatch])
        

    return (
        <div className="login">
            <form action="" className="loginForm" onSubmit={loginHandler}>
                <Typography variant="h3" style={{ padding: "2vmax", color: 'blue' }} >
                    NetWorks
                </Typography>
                <input type="email" placeholder='Email' required
                    value={email} onChange={(e) => setEmail(e.target.value)}  />
                <input type="password" placeholder='Password' required
                    value={password} onChange={(e) => setPassword(e.target.value)}  />
                <Link to="/forgot/password">
                    <Typography>Forgot Password?</Typography>
                </Link>

                <Button type="submit " >Login</Button>
                <Link to="/register">
                    <Typography>New User?</Typography>
                </Link>
            </form>
        </div>
    )
}

export default Login
