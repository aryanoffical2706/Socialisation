import React from 'react'
import "./user.css"
import {Link} from "react-router-dom"
import {Typography} from "@mui/material"
function User({userId,name,avatar}) {
  return (
   <Link to={`/user/${userId}`} className='homeUser'>
    <img src={avatar}></img>
    <Typography>{name}</Typography>
   </Link>
  )
}

export default User