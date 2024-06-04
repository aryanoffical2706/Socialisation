import React, { useState } from 'react';
import './post.css';
import { Avatar, Button, Typography, Dialog } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux"
import { addCommentOnPost, deletePost, likePost, updatePost } from '../../Actions/Post';
import { useEffect } from 'react';
import { getFollowingPosts, getUserProfile, loadUser, myPost, userPost } from '../../Actions/User';
import User from '../User/User';
import CommentCard from '../CommentCard/CommentCard';
import { useParams } from 'react-router-dom';
const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerId,
  ownerName,
  isDelete = false,
  isAccount = false,
  salary="home"
}) => {
  const params=useParams()
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption );
  const [captionToggle, setCaptionToggle] = useState(false);
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const handleLike = async () => {
    setLiked(!liked)
    await dispatch(likePost(postId))
    if (isAccount) {
       await dispatch(myPost()) 
    } 
   
    else {
     await  dispatch(getFollowingPosts());
    }
    if(salary==="home"){
      await dispatch(getUserProfile(params.id));
      dispatch(userPost(params.id))
    }
  }
  const updateCaptionHandler=()=>{
    dispatch(updatePost(captionValue,postId))
    dispatch(myPost())
  }
 const deleteHandler=async()=>{
  await dispatch(deletePost(postId))
  await dispatch(myPost())
  await dispatch(loadUser())
 }




  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      } 
    });
  }, [likes, user._id])
  const addCommentHandler = async (e) => {
    e.preventDefault();
    await dispatch(addCommentOnPost(postId, commentValue));
    if (isAccount) {
      dispatch(myPost())
    } else {
      dispatch(getFollowingPosts());
    }
  }

  return (
    <div className="post">
      <div className="postHeader">
        {isAccount ? <Button onClick={()=>{setCaptionToggle(!captionToggle)}}>
          <MoreVert />
        </Button> : null}
      </div>
      <img src={postImage} alt="post" />
      <div className="postDetails">
        <Avatar src={ownerImage} alt="user" sx={{ height: '3vmax', width: '3vmax' }}></Avatar>
        <Link to={`/user/${ownerName}`}>
          <Typography fontWeight={700}>
            {ownerName}
          </Typography>  </Link>
        <Typography fontWeight={100} color='rgba(0,0,0,0.582)' style={{ alignSelf: "center" }}>
          {caption}
        </Typography>

      </div>
      <button style={{
        border: "none",
        backgroundColor: "white",
        cursor: "pointer",
        margin: "1vmax 2vmax",
      }} onClick={() => setLikesUser(!likesUser)}
        disabled={likes.length === 0 ? true : false}>
        <Typography>
          {likes.length} Likes
        </Typography>
      </button>
      <div className="postFooter">
        <Button onClick={handleLike}>
          {liked ? <Favorite style={{
            color: "blue"
          }} /> : <FavoriteBorder />}

        </Button>
        <Button onClick={() => setCommentToggle(!commentToggle)}>
          <ChatBubbleOutline />
        </Button>
        
          {isDelete ?(<Button onClick={deleteHandler}> <DeleteOutline /> </Button> ): null}

       
      </div>
      <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
        <div className="dialogBox">
          <Typography variant='h4'>Liked by</Typography>
          {
            likes.map((like) => (
              <User
                key={user._id}
                userId={like._id}
                name={like.name}
                avatar={like.avatar.url} />
            ))
          }

        </div>
      </Dialog>
      <Dialog open={commentToggle} onClose={() => setCommentToggle(!captionToggle)}>
        <div className="dialogBox">
          <Typography variant='h4'>Comments</Typography>
          <form className="commentForm" onSubmit={addCommentHandler}>
            <input type='text' value={commentValue} onChange={(e) => setCommentValue(e.target.value)} placeholder='Add your comment' required ></input>
            <Button type='submit' variant='contained'>Add</Button>
          </form>
          {
            comments.length > 0 ? (
              comments.map((item) => <CommentCard
                userId={item.user._id}
                name={item.user.name}
                avatar={item.user.avatar.url}
                comment={item.comment}
                commentId={item._id}
                postId={postId}
                isAccount={isAccount}
              />)
            ) : <Typography>No comments yet</Typography>
          }

        </div>
      </Dialog>
      <Dialog open={captionToggle} onClose={() => setCaptionToggle(!captionToggle)}>
        <div className="dialogBox">
          <Typography variant='h4'>Update Caption</Typography>
          <form className="commentForm" onSubmit={updateCaptionHandler}>
            <input type='text' value={captionValue} onChange={(e) => setCaptionValue(e.target.value)} placeholder='update caption' required ></input>
            <Button type='submit' variant='contained'>update</Button>
          </form>
          

        </div>
      </Dialog>
    </div>
  );
};

export default Post;
