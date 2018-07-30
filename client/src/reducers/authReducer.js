import {LOG_IN, REGISTER, SET_USER, LOG_OUT} from '../actions/types';

const initialState = {
    isAuth: false,
    user: null,
    message: '',
};


export default (state = initialState, action) => {
    switch (action.type) {
        case REGISTER:
            console.log(action);
            return {...initialState, message: action.payload};
        case LOG_IN:
            console.log(action);
            return {isAuth: true, user: action.payload, message: 'Logged in'};
        case SET_USER:
            return {isAuth: true, user: action.payload, message: ''};
        case LOG_OUT:
            return initialState;
        default :
            return state
    }
}
