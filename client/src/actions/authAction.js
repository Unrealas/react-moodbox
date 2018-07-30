import {LOG_IN, REGISTER, SET_USER ,LOG_OUT, GET_ERR} from './types';
import axios from 'axios';
import jwt from 'jsonwebtoken';

export function register(data, history) {
    console.log(data);
    return async function (dispatch) {
        try {
            const res = await axios.post('/api/register', data);
            console.log(res);
            dispatch({
                type: REGISTER,
                payload: 'Registration success!'
            });
            // redirect thren push register
            history.push('/login')
        } catch (e) {
            console.log(e.response);
            dispatch({
                type:GET_ERR,
                payload:e.response.data
            })
        }
    }
}

export function login(data, history) {
    console.log(data);
    return async function (dispatch) {
        try {
            const res = await axios.post('/api/login', data);
            // save token to localstorage
            localStorage.setItem('token', "Bearer "+res.data);
            // save token to axios
            axios.defaults.headers.common['Authorization']= 'Bearer '+res.data;
            //decode JWT
            const user = jwt.decode(res.data);
            console.log(user);

            // dispatch user
            dispatch({
                type: LOG_IN,
                payload: user
            });
            history.push('/');
        } catch (e) {
            console.log(e.response);
            dispatch({
                type:GET_ERR,
                payload:e.response.data
            })
        }
    }
}

export function setUser(user) {
    return{
        type: SET_USER,
        payload: user
    }
}

export function logout() {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    return{
        type: LOG_OUT,
    }
}