import React, { useEffect } from 'react';
import './home.css';
import User from '../Components/User/User';
import Post from '../Components/Post/Post';
import{useDispatch,useSelector} from "react-redux"
import { getAllUsers, getFollowingPosts} from '../Actions/User';
import Loader from '../Components/Loader/Loader.jsx';
import {Typography} from "@mui/material"
function Home() {
  const dispatch=useDispatch();
  useEffect(()=>{
   dispatch(getFollowingPosts())
   dispatch(getAllUsers())
  },[dispatch])
  const {loading,error,posts}=useSelector((state)=>
    state.postOfFollowing
  );
  const{users,loading:usersLoading}=useSelector((state)=>
    state.allUsers,
  ); 
  const {error:likeError,message}=useSelector((state)=>state.like)

  return (
    loading===true || usersLoading===true?<Loader/>:(<div className="home">
    <div className="homeLeft">
     {posts && posts.length >0?posts.map((post)=>(<Post
      key={post._id}
      postId={post._id}
      caption={post.caption}
      postImage={post.image.url }
      likes = {post.likes}
      comments={post.comments}
      ownerImage={post.owner.avatar.url}
      ownerId={post.owner._id}
      ownerName={post.owner.name}/>)):<Typography variant='h6'>No posts yet</Typography>}
    </div>
    <div className="homeRight">
     {users && users.length>0?(users.map((user)=>( <User key={user._id}
        userId={user._id}
        name={user.name}
        avatar={user.avatar.url}
      />))):<Typography>No users yet</Typography>}
    </div>
  </div>)
   )
  ;
}

export default Home;
