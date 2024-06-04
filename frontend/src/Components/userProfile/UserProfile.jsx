import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { followUser, getUserProfile, userPost } from '../../Actions/User.js';
import Loader from '../Loader/Loader';
import { Avatar, Button, Dialog, Typography } from '@mui/material';
import Post from '../Post/Post.jsx';
import User from '../User/User.jsx';
import { useParams } from 'react-router-dom';
const UserProfile=()=> {
    const params=useParams();
    const dispatch = useDispatch();
  
  
    const { user, loading: userLoading,error:userError } = useSelector((state) => state.userProfile);
    const { loading, posts } = useSelector((state) => state.userReducer);
    const {error:likeError,message,loading:followLoading}=useSelector((state)=>state.like)    
  const {user:me}=useSelector((state)=>state.user)
    const [followersToggle, setFollowersToggle] = useState(false);
    const [followingToggle, setFollowingToggle] = useState(false);
    const [following,setFollowing]=useState(false);
    const [myProfile,setMyProfile]=useState(false);

  
  const followingHandler=async()=>{
    setFollowing(!following)
   await dispatch(followUser(user._id))
   await dispatch(getUserProfile(params.id))
    
  }
  useEffect(() => {
       if(me._id===params.id){
        setMyProfile(true);
       }
       
    dispatch(userPost(params.id));
    dispatch(getUserProfile(params.id));
  }, [dispatch,me._id,params.id]);
  useEffect(()=>{
    if(user){
        user.followers.forEach((item)=>{
            if(item._id===me._id){
                setFollowing(true);
            }
            else{
                setFollowing(false);
            }
        })
       }
  },[user])
  useEffect(()=>{
  
    if(likeError){
      dispatch({
        type:"clearErrors"
      })
    }
    if(userError){
        dispatch({
          type:"clearErrors"
        })
      }
    if(message){
      dispatch({
        type:"clearMessage"
      })
    }
  },[likeError,userError,dispatch,message])
    
  
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
      salary="home"
      />)):<Typography variant='h6'>This user has no posts yet</Typography>}
        </div>
        <div className="accountright">
         {user &&<>
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
          {myProfile?null:<Button style={{background:following?"red":"blue"}} onClick={followingHandler} disabled={followLoading} variant="contained" >
          {
            following?"unfollow":"follow"
          }
          </Button>}
          
  </>}
           
  
       
  
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

export default UserProfile
