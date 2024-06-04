import React, { useState } from 'react'
import "./search.css"
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../Actions/User';
import User from '../User/User';
function Search() { 
    const [name,setName]=useState("") 
    const{users,loading:usersLoading}=useSelector ((state)=>state.allUsers,
);
    const dispatch=useDispatch();
    const submitHandler=async(e)=>{
        e.preventDefault();
        dispatch(getAllUsers(name))

    }

  return (
    <div className="search">
    <form className='searchForm' onSubmit={submitHandler}>
    <Typography variant="h3" style={{ padding: "2vmax", color: 'blue' }} >
                NetWorks
            </Typography>
            
            <input type='name' placeholder='Enter user name' required value={name} onChange={(e)=>setName(e.target.value)}  />
            <Button  type="submit " >search</Button>
            <div className="searchResults">
                { users && users.map((user)=>(
                    <User 
                    key={user._id}
                    userId={user._id}
                    name={user.name}
                    avatar={user.avatar.url}/>
                ))}
               
            </div>
    </form>
</div>
  )
}

export default Search