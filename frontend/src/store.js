import { configureStore } from "@reduxjs/toolkit";
import {allUsersReducer, postOfFollowingReducer, userProfileReducer, userReducer} from "./Reducers/User"; // Update the import to remove curly braces
import { likeReducer, myPostsReducer, userPostsReducer } from "./Reducers/Post";

const store = configureStore({
    reducer: { 
        user: userReducer,
        postOfFollowing:postOfFollowingReducer,
        allUsers:allUsersReducer,
        like:likeReducer,
        myPosts:myPostsReducer,
        userProfile:userProfileReducer,
        userReducer:userPostsReducer 
    },
});

export default store;
