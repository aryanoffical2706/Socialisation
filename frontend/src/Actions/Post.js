import axios from "axios"
import { API_URL } from "../Components/process/Process";
export const likePost = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "likeRequest"
      });
      const { data } = await axios(`${API_URL}/api/v1/post/${id}`);
    
        dispatch({
          type: "likeSuccess",
          payload: data.message 
        });
       
    } catch (error) {
      dispatch({
        type: "likeFailure",
        payload: error.message // Provide the error message for better debugging
      });
    }
  };
  export const addCommentOnPost = (id,comment) => async (dispatch) => {
    try {
      dispatch({
        type: "addCommentRequest"
      });
      const { data } = await axios.put(`${API_URL}/api/v1/post/comment/${id}`,{comment},{headers:{
        "Content-Type":"application/json", 
      }});
    
        dispatch({
          type: "addCommentSuccess",
          payload: data.message 
        });
       
    } catch (error) {
      dispatch({
        type: "addCommentFailure",
        payload: error.message // Provide the error message for better debugging
      });
    }
  };
  export const deleteCommentOnPost = (id,commentId) => async (dispatch) => {
    try {
      dispatch({
        type: "deleteCommentRequest"
      });
      const { data } = await axios.delete(`${API_URL}/api/v1/post/comment/${id}`,{
        data:{commentId}
      })
        dispatch({
          type: "deleteCommentSuccess",
          payload: data.message 
        });
       
    } catch (error) {
      dispatch({
        type: "deleteCommentFailure",
        payload: error.message // Provide the error message for better debugging
      });
    }
  };
  export const createNewPost = (caption,image) => async (dispatch) => {
    try {
      dispatch({
        type: "newPostRequest"
      });
      const { data } = await axios.post(`${API_URL}/api/v1/post/upload`,{
        caption,
        image,
      },{
        headers:{
          "Content-Type":"application/json"
        }
      })
        dispatch({
          type: "newPostSuccess",
          payload: data.message 
        });
       
    } catch (error) {
      dispatch({
        type: "newPostFailure",
        payload: error.message // Provide the error message for better debugging
      });
    }
  };
  export const updatePost = (caption,id) => async (dispatch) => {
    try {
      dispatch({
        type: "updateCaptionRequest"
      });
      const { data } = await axios.put(`${API_URL}/api/v1/post/${id}`,{
        caption,
        
      },{
        headers:{
          "Content-Type":"application/json"
        }
      })
        dispatch({
          type: "updateCaptionSuccess",
          payload: data.message 
        });
       
    } catch (error) {
      dispatch({
        type: "updateCaptionFailure",
        payload: error.message // Provide the error message for better debugging
      });
    }
  };
  export const deletePost = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "deletePostRequest"
      });
      const { data } = await axios.delete(`${API_URL}/api/v1/post/${id}`)
        dispatch({
          type: "deletePostSuccess",
          payload: data.message 
        });
       
    } catch (error) {
      dispatch({
        type: "deletePostFailure",
        payload: error.message // Provide the error message for better debugging
      });
    }
  };
  
  