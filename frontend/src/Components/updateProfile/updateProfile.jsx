import React, { useEffect, useState } from 'react'
import { Avatar ,Typography,Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {  loadUser, updateProfile } from '../../Actions/User';
import "./updateProfile.css"
const UpdateProfile=()=> {
    const { user, error } = useSelector((state) => state.user);
    const {loading:updateLoading,
    error:updateError,
message}=useSelector((state)=>state.like)
    const [name,setName]=useState(user.name);
    const [email,setEmail]=useState(user.email );
    const [avatar,setAvatar]=useState("");
    const [avatarPrev,setAvatarPrev]=useState(user.avatar.url);
    

    const dispatch=useDispatch();
    const submitHandler=async(e)=>{
        e.preventDefault();
       await dispatch(updateProfile(name,email,avatar))
        dispatch(loadUser());

    }
    useEffect(()=>{
        if(error){
            dispatch({type:"clearErrors"})
        }
        if(updateError){
            dispatch({type:"clearErrors"})
        }
        if(message){
            dispatch({type:"clearMessage"})
        }
    },[dispatch,error,updateError,message ])
    const handleImageChange=(e)=>{
        const file=e.target.files[0]
        const Reader=new FileReader();
        Reader.readAsDataURL(file); 
        Reader.onload=()=>{
            if(Reader.readyState ===2){
                setAvatarPrev(Reader.result);
                setAvatar(Reader.result);
            }
        }
    }

  return (
    <div className="register">
        <form className='updateProfileForm' onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax", color: 'blue' }} >
                    NetWorks
                </Typography>
                <Avatar src={avatarPrev}
                alt='User'
                sx={{height:"10vmax", width:"10vmax"}}/>
                <input type='file' accept='image/*' onChange={handleImageChange}  />
                <input type='text' className='updateProfileInputs' value={name} placeholder='Name ' required onChange={(e) => setName(e.target.value)} ></input>
                <input type="email" className='updateProfileInputs' placeholder='Email' required
                    value={email} onChange={(e) => setEmail(e.target.value)}  />
              
                 

                <Button disabled={updateLoading} type="submit " >update</Button>
        </form>
    </div>
  )
}



export default UpdateProfile