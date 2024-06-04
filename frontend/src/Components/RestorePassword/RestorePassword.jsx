import React, { useEffect, useState } from 'react'
import "./RestorePassword.css"
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../Actions/User';
import { Link, useParams } from 'react-router-dom';
function RestorePassword() {
    const dispatch=useDispatch();
    const [newPassword,setNewPassword]=useState("");
    const {loading,error,message}=useSelector((state)=>state.like )
    const params=useParams()
    const passwordHandler = async(e) => {
        e.preventDefault();
       dispatch(resetPassword(params.token,newPassword))
  
      };
      useEffect(()=>{
        if(error){
            dispatch({type:"clearErrors"})
        }
       
        if(message){
            dispatch({type:"clearMessage"})
        }
    },[dispatch,error,message ])
  return (
    <div className="resetPassword">
    <form action="" className="resetPasswordForm" onSubmit={passwordHandler}>
        <Typography variant="h3" style={{ padding: "2vmax", color: 'blue' }} >
            NetWorks
        </Typography>
       
        <input type="password" placeholder='new password' required
           className='resetPasswordInputs' value={newPassword} onChange={(e) => setNewPassword(e.target.value)}  />
      <Link to="/">
        <Typography>Login
      
        </Typography>
       </Link>
       <Typography>
      or
        </Typography>
       <Link to="/forgot/password">
        <Typography>send mail again</Typography>
       </Link>

        <Button disabled={loading} type="submit" >Reset</Button>
      
    </form>
</div>
  )
}

export default RestorePassword