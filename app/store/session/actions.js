import * as types from './actionTypes'
import axios from 'axios';
import ROOT_URL from '../../config/endpoint';

export const signupUser = (email, password) => {
    return (dispatch) => {
        dispatch(sessionLoading())
        axios.post(`${ROOT_URL}/signup`, {
            email,
            password
        })
            .then(function (response) {
                console.log(response);
                const { token } = response.data;
                dispatch(sessionSuccess({ email, token }));
            })
            .catch(function (error) {
                console.log(error);
                dispatch(sessionError(error));
            });
    }
}

export const logoutUser = () => {
    return (dispatch) => {
        dispatch(sessionLoading())
        dispatch(sessionLogout());
    }
}

export const loginUser = (email, password) => {
    return (dispatch) => {
        console.log(email, password);
        dispatch(sessionLoading())
        axios.post(`${ROOT_URL}/signin`, {
            email,
            password
        })
            .then(function (response) {
                console.log("response from login", response.data);
                const { token } = response.data;
                dispatch(sessionSuccess({ email, token }));
            })
            .catch(function (error) {
                console.log(error);
                dispatch(sessionError(error));
            });
    }
}

export const restoreSession = () => {
    return (dispatch) => {
        dispatch(sessionSuccess({ mail: "mail@gmail.com",token: 123412 }));
    }
}

const sessionLoading = () => ({
    type: types.SESSION_LOADING
})

const sessionError = error => ({
    type: types.SESSION_ERROR,
    error
})

const sessionSuccess = user => ({
    type: types.SESSION_SUCCESS,
    user
})

const sessionLogout = () => ({
    type: types.SESSION_LOGOUT
})

const sessionRestoring = () => ({
    type: types.SESSION_RESTORING
})