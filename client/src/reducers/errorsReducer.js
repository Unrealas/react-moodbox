import {GET_ERR, LOG_IN} from '../actions/types';


export default (state = {}, action) => {
    // console.log(action.payload);
    switch (action.type) {
        case GET_ERR:
            return action.payload;
        case LOG_IN :
            return {};
        default:
            return state
    }
}