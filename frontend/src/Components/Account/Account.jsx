import React, { useEffect, useState } from 'react'
import "./account.css"
import { useDispatch, useSelector } from 'react-redux'
import { deleteProfile, logoutUser, myPost } from '../../Actions/User.js';
import Loader from '../Loader/Loader';
import { Avatar, Button, Dialog, Typography } from '@mui/material';
import Post from '../Post/Post.jsx';
import { Link } from 'react-router-dom';
import User from '../User/User.jsx';
const Account=()=> {
    
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(myPost());
    }, [dispatch]);
  
    const { user, loading: userLoading } = useSelector((state) => state.user);
    const { loading, posts } = useSelector((state) => state.myPosts);
    const {error:likeError,message}=useSelector((state)=>state.like)    
  
    const [followersToggle, setFollowersToggle] = useState(false);
  
    const [followingToggle, setFollowingToggle] = useState(false);
  
  
 const logoutHandler=async()=>{
  await dispatch(logoutUser());

 }
 const deleteProfileHandler=async()=>{
  await dispatch(deleteProfile());
  await dispatch(logoutUser())
 }

  useEffect(()=>{
  
    if(likeError){
      dispatch({
        type:"clearErrors"
      })
    }
    if(message){
      dispatch({
        type:"clearMessage"
      })
    }
  },[likeError,dispatch,message])
    
  
    return loading === true || userLoading === true ? (
      <Loader />
    ) : (
      <div className="account">
        <div className="accountleft">
        {posts && posts.length >0?posts.map((post)=>(<Post
      key={post._id}
      postId={post._id}
      caption={post.caption}
      postImage={post.image.url }
      likes = {post.likes}
      comments={post.comments}
      ownerImage={post.owner.avatar.url}
      ownerId={post.owner._id}
      ownerName={post.owner.name}
      isAccount={true}
      isDelete={true}/>)):<Typography variant='h6'>No posts yet</Typography>}
        </div>
        <div className="accountright">
          <Avatar
            src={user.avatar.url}
            sx={{ height: "8vmax", width: "8vmax" }}
          />
  
          <Typography variant="h5">{user.name}</Typography>
  
          <div>
            <button onClick={() => setFollowersToggle(!followersToggle)}>
              <Typography>Followers</Typography>
            </button>
            <Typography>{user.followers.length}</Typography>
          </div>
  
          <div>
            <button onClick={() => setFollowingToggle(!followingToggle)}>
              <Typography>Following</Typography>
            </button>
            <Typography>{user.following.length}</Typography>
          </div>
  
          <div>
            <Typography>Posts</Typography>
            <Typography>{user.posts.length}</Typography>
          </div>
  
          <Button variant="contained" onClick={logoutHandler}>
            Logout
          </Button>
  
          <Link to="/update/profile">Edit Profile</Link>
          <Link to="/update/password">Change Password</Link>
  
          <Button
            variant="text"
            style={{ color: "red", margin: "2vmax" }}
           onClick={deleteProfileHandler}
          >
            Delete My Profile
          </Button>
  
          <Dialog
            open={followersToggle  }
            onClose={() => setFollowersToggle(!followersToggle)}
          >
            <div className="dialogBox">
              <Typography variant="h4">Followers</Typography>
  
              {user && user.followers.length > 0 ? (
                user.followers.map((follower) => (
                  <User
                    key={follower._id}
                    userId={follower._id}
                    name={follower.name}
                    avatar={follower.avatar.url}
                  />
                ))
              ) : (
                <Typography style={{ margin: "2vmax" }}>
                  You have no followers
                </Typography>
              )}
            </div>
          </Dialog>
  
          <Dialog
            open={followingToggle}
            onClose={() => setFollowingToggle(!followingToggle)}
          >
            <div className="dialogBox">
              <Typography variant="h4">Following</Typography>
  
              {user && user.following.length > 0 ? (
                user.following.map((follow) => (
                  <User
                    key={follow._id}
                    userId={follow._id}
                    name={follow.name}
                    avatar={follow.avatar.url}
                  />
                ))
              ) : (
                <Typography style={{ margin: "2vmax" }}>
                  You're not following anyone
                </Typography>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    );
  };

export default Account 
