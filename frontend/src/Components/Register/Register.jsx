import React, { useEffect, useState } from 'react'
import "./register.css"
import { Avatar ,Typography,Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../Actions/User';
import { Link } from 'react-router-dom';
function Register() {

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [avatar,setAvatar]=useState("");
    const [password,setPassword]=useState("");
    const {loading,error}=useSelector((state)=>state.user)
    const dispatch=useDispatch();
    const submitHandler=async(e)=>{
        e.preventDefault();
        dispatch(registerUser(name,email,password,avatar))

    }
    useEffect(()=>{
        if(error){
            dispatch({type:"clearErrors"})
        }
    },[dispatch,error ])
    const handleImageChange=(e)=>{
        const file=e.target.files[0]
        const Reader=new FileReader();
        Reader.readAsDataURL(file); 
        Reader.onload=()=>{
            if(Reader.readyState ===2){
                setAvatar(Reader.result);
            }
        }
    }

  return (
    <div className="register">
        <form className='registerForm' onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax", color: 'blue' }} >
                    NetWorks
                </Typography>
                <Avatar src={avatar}
                alt='User'
                sx={{height:"10vmax", width:"10vmax"}}/>
                <input type='file' accept='image/*' onChange={handleImageChange}  />
                <input type='text' className='registerInputs' value={name} placeholder='Name ' required onChange={(e) => setName(e.target.value)} ></input>
                <input type="email" className='registerInputs' placeholder='Email' required
                    value={email} onChange={(e) => setEmail(e.target.value)}  />
                <input type="password" className='registerInputs' placeholder='Password' required
                    value={password} onChange={(e) => setPassword(e.target.value)}  />
                <Link to="/">
                    <Typography>Login</Typography>
                    
                    </Link>

                <Button disabled={loading} type="submit " >Signup</Button>
        </form>
    </div>
  )
}

export default Register