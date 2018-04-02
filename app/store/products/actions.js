import * as types from './actionTypes';
import axios from 'axios';
import ROOT_URL from '../../config/endpoint';

export const searchProducts = (name) => {
    return (dispatch) => {
        dispatch(productListLoading());
        axios.post(`${ROOT_URL}/product`, {
            name
        })
            .then(function (response) {
                dispatch(searchProductsSuccess(response.data));
                dispatch(productListLoaded())
            })
            .catch(function (error) {
                console.warn(error);
                dispatch(productListLoaded())
            });
    }
}

export const addUserProduct = (product) => {
    return (dispatch, getstate) => {
        axios.post(`${ROOT_URL}/addUserProduct`, {
            product,
            user: getstate().session.user
        })
            .then(function (response) {
                dispatch(userProductAdded(product))
            })
            .catch(function (error) {
                console.warn(error);
            });
    }
}

export const removeUserProduct = (product) => {
    return (dispatch, getstate) => {
        axios.post(`${ROOT_URL}/removeUserProduct`, {
            product,
            user: getstate().session.user
        })
            .then(function (response) {
                dispatch(userProductRemoved(response.data))
            })
            .catch(function (error) {
                console.warn(error);
            });
    }
}

export const loadUserProducts = () => {
    return (dispatch, getstate) => {
        axios.post(`${ROOT_URL}/userProducts`, {
            user: getstate().session.user
        })
            .then(function (response) {
                dispatch(userProductsLoaded(response.data))
            })
            .catch(function (error) {
                console.warn(error);
            });
    }
}

const searchProductsSuccess = products => ({
    type: types.SEARCH_PRODUCTS,
    products
})

const productListLoading = () => ({
    type: types.PRODUCTS_LIST_LOADING
})

const productListLoaded = () => ({
    type: types.PRODUCTS_LIST_LOADING
})

const userProductAdded = product => ({
    type: types.ADD_USER_PRODUCT,
    product
})

const userProductsLoaded = products => ({
    type: types.LOAD_USER_PRODUCTS,
    products
})

const userProductRemoved = products => ({
    type: types.REMOVE_USER_PRODUCT,
    products
})