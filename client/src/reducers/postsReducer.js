import {COMMENT_POST, DELETE_POST, FETCH_ALL_POSTS, FETCH_ONE_POST, LIKE_POST, LOG_OUT} from '../actions/types'


export default (state = null, action) => {
    switch (action.type) {
        case FETCH_ALL_POSTS:
            return action.payload;
        case FETCH_ONE_POST:
            return [action.payload];
        case LOG_OUT:
            return null;
        case DELETE_POST:
            return state.filter((post) => post._id!==action.payload);
        case LIKE_POST:
            return state.map((post) => {
                if(post._id===action.payload._id){
                    return {...post, likes:action.payload.likes}
                }else{
                    return post
                }
            });
        case COMMENT_POST:
            return state.map((post) => {
                if(post._id===action.payload._id){
                    return {...post, comments:action.payload.comments}
                }else{
                    return post
                }
            });
        default:
            return state
    }
}