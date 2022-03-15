import api from "../../services/API"
import {postConstants} from "./consts";


const createPost = (formData, updateRunner) => (dispatch) => {
    api.post('/post/add', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then((r) => {
        dispatch({type: postConstants.ADD_NEW_POST, payload: r})
        updateRunner(prev => ([r, ...prev]));
    }).catch(() => {
        console.error()
    })
}

const getAllPosts=({view, limit})=>(dispatch)=>{
    const postList = [];
    if (view === 0) dispatch({type:postConstants.CLEAR_POSTS})

    api.get(`/post/following?page=${view}&size=${limit}`,{
        headers: {
            "Content-Type": "application/json"
        }
    }).then((r)=>{
        r ? postList.push(...r) : void 0;
        dispatch({type:postConstants.GET_ALL_POSTS_SUCCESS, payload: postList})
    }).catch(()=>{
        console.error("subs not loaded")
    })
}

const getUserPosts=({view, limit})=>(dispatch)=>{
    if (view === 0) dispatch({type:postConstants.CLEAR_POSTS})
    api.get(`/post/by-auth?page=${view}&size=${limit}`,{
        headers: {
            "Content-Type": "application/json"
        }
    }).then((r)=>{
        dispatch({type:postConstants.GET_ALL_POSTS_SUCCESS, payload: r})
    }).catch(()=>{
        console.error("own posts not loaded")
    })
}

const getUserPostsById=({userId, view, limit}) => (dispatch) => {
    const postList = [];
    if (view === 0) dispatch({type:postConstants.CLEAR_POSTS})
    api.get(`/post/byId/${userId}?page=${view}&size=${limit}`,{
        headers: {
            "Content-Type": "application/json"
        }
    }).then((r)=>{
        r ? postList.push(...r) : void 0;
        dispatch({type:postConstants.GET_ALL_POSTS_SUCCESS, payload: postList})
    }).catch(()=>{
        console.error("user posts not loaded")
    })
}


export const postActions = {
    createPost,
    getAllPosts,
    getUserPosts,
    getUserPostsById
}