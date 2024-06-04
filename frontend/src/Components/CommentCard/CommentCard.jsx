import React from 'react'
import "./commentCard.css"
import { Link } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useDispatch, useSelector  } from 'react-redux'
import { deleteCommentOnPost } from '../../Actions/Post'
import { getFollowingPosts, myPost } from '../../Actions/User'
function CommentCard({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount
}) {
  const dispatch=useDispatch();
  const deleteCommentHandler=()=>{
    dispatch(deleteCommentOnPost(postId,commentId))
    if (isAccount) {
      dispatch(myPost());
     } else {
      dispatch(getFollowingPosts());
     }
    
  
   
  }
  const {user}= useSelector((state)=>state.user)
  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt={name}/>
        <Typography style={{minWidth:"6vmax",
      margin:"10px"}}>{name}
        
        </Typography>

      </Link>
      <Typography style={{
      margin:"10px"}}>{comment}</Typography>
      {
        isAccount?(<Button style={{minWidth:"6vmax",
        margin:"10px"}} onClick={deleteCommentHandler}><Delete/></Button>):userId===user._id?(<Button onClick={deleteCommentHandler} style={{minWidth:"6vmax",
        margin:"10px"}}><Delete/></Button>):null
      }
    </div>
  )
}

export default CommentCard