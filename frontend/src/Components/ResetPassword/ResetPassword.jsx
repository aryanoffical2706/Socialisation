import React, { useEffect, useState } from 'react'
import { Typography, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import "./resetPassword.css"
import { loadUser, updatePassword } from '../../Actions/User'
const ResetPassword = () => {
    const {error,loading,message}=useSelector((state)=>state.like)
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const dispatch = useDispatch();

    const passwordHandler = async(e) => {
        e.preventDefault();
       await dispatch(updatePassword(oldPassword,newPassword));
       await dispatch(loadUser());
  
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
                <input type="old password" placeholder='old password' required
                  className='resetPasswordInputs'  value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}  />
                <input type="new password" placeholder='new password' required
                   className='resetPasswordInputs' value={newPassword} onChange={(e) => setNewPassword(e.target.value)}  />
            

                <Button disabled={loading} type="submit" >Reset Password</Button>
              
            </form>
        </div>
    )
}




export default ResetPassword