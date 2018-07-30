import {FETCH_ALL_POSTS, GET_ERR, FETCH_ONE_POST, DELETE_POST, LIKE_POST, COMMENT_POST} from '../actions/types'
import axios from 'axios';

export function fetchAllPosts() {
    return async function (dispatch) {
        try {
            const res = await axios.get('/api/posts');
            dispatch({
                type: FETCH_ALL_POSTS,
                payload: res.data,
            })
        } catch (e) {
            // console.log(e.response);
            dispatch({
                type: GET_ERR,
                payload: 'unexpected server error'
            })
        }
    }
}

export function fetchSinglePost(title) {
    return async function (dispatch) {
        try {
            const res = await axios.get(`/api/post/${title}`);
            // console.log(res.data);
            dispatch({
                type: FETCH_ONE_POST,
                payload: res.data,

            })
        } catch (e) {
            dispatch({
                type: GET_ERR,
                payload: {post: 'post not found'}
            })
        }
    }
}

export function deletePost(id) {
    return async function (dispatch) {
        try {
            await axios.delete('/api/posts/' + id);
            dispatch({
                type: DELETE_POST,
                payload: id
            })
        } catch (e) {
            dispatch({
                type: GET_ERR,
                payload: 'unexpected server error'
            })
        }
    }
}

export function likePost(id) {
    return async function (dispatch) {
        try {
            const res = await axios.post('/api/posts/' + id);
            dispatch({
                type: LIKE_POST,
                payload: res.data
            })
        } catch (e) {
            console.log(e);
        }
    }
}


export function commentPost(id, comment) {
    return async function (dispatch) {
        try {
            const res = await axios.post('/api/post-comment/' + id, {comment});
            console.log(id, comment);
            console.log(res.data);
            dispatch({
                type: COMMENT_POST,
                payload: res.data
            })
        } catch (e) {
            dispatch({
                type: GET_ERR,
                payload: {message: 'internal server error'}
            })
        }
    }
}