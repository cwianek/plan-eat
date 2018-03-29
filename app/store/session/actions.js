import * as types from './actionTypes'
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import ROOT_URL from '../../config/endpoint';

export const signupUser = (email, password) => {
    return (dispatch) => {
        dispatch(sessionLoading())
        axios.post(`${ROOT_URL}/signup`, {
            email,
            password
        })
            .then(function (response) {
                const { token } = response.data;
                dispatch(sessionSuccess({ email, token }));
                saveToStorage(email, token);
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
        resetStorage();
    }
}

export const loginUser = (email, password) => {
    return (dispatch) => {
        dispatch(sessionLoading())
        axios.post(`${ROOT_URL}/signin`, {
            email,
            password
        })
            .then(function (response) {
                const { token } = response.data;
                saveToStorage(email, token);
                dispatch(sessionSuccess({ email, token }));
            })
            .catch(function (error) {
                console.log(error);
                dispatch(sessionError(error));
            });
    }
}

export const restoreSession = () => {
    return async function (dispatch) {
        const credentials = await loadFromStorage();
        dispatch(sessionSuccess(credentials))
    }
}

async function saveToStorage(email, token, dispatch) {
    try {
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("email", email);
    } catch (error) {
        console.log("Error saving data" + error);
    }
}

async function resetStorage() {
    try {
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('token');
    } catch (error) {
        console.log("Error reseting data" + error);
    }
}

async function loadFromStorage(dispatch) {
    try {
        const email = await AsyncStorage.getItem('email');
        const token = await AsyncStorage.getItem('token');
        return { token, email }
    } catch (error) {
        console.log("Error retrieving data" + error);
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