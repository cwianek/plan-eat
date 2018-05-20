import * as types from './actionTypes';
import axios from 'axios';
import ROOT_URL from '../../config/endpoint';

export const searchRecipes = (name) => {
    return (dispatch) => {
        dispatch(recipeListLoading());
        axios.post(`${ROOT_URL}/food`, {
            name
        })
            .then(function (response) {
                dispatch(searchRecipesSuccess(response.data.recipes));
                dispatch(recipeListLoaded())
            })
            .catch(function (error) {
                console.log(error);
                dispatch(recipeListLoaded())
            });
    }
}

export const getRecipeDetails = (id) => {
    return (dispatch) => {
        dispatch(recipeDetailsLoading());
        axios.post(`${ROOT_URL}/details`, {
            id
        })
            .then(function (response) {
                dispatch(getRecipeDetailsSuccess(response.data));
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}

export const addUserRecipe = (recipe) => {
    return (dispatch, getstate) => {
        axios.post(`${ROOT_URL}/addUserRecipe`, {
            recipe,
            user: getstate().session.user
        })
            .then(function (response) {
                dispatch(userRecipeAdded(recipe))
            })
            .catch(function (error) {
                console.warn(error);
            });
    }
}

export const getUserRecipes = (params) => {
    return (dispatch, getstate) => {
        axios.post(`${ROOT_URL}/getUserRecipes`, {
            params,
            user: getstate().session.user
        })
            .then(function (response) {
                dispatch(getUserRecipesSuccess(response.data))
            })
            .catch(function (error) {
                console.warn(error);
            });
    }
}

export const askByImage = (image, callback) => {
    return (dispatch, getstate) => {
        callback();        
        dispatch(recipeListLoading());        
        axios.post(`${ROOT_URL}/askByImage`, {
            image,
            user: getstate().session.user
        })
            .then(function (response) {
                console.log(response.mydata)
                dispatch(changeRecipeNameSuccess(response.data.recipeName))                
                dispatch(askByImageSuccess(response.data.recipes))
                dispatch(recipeListLoaded())                
            })
            .catch(function (error) {
                console.warn(error);
                dispatch(recipeListLoaded())                
            });
    }
}

export const changeRecipeName = (text) => {
    return (dispatch) => {
        dispatch(changeRecipeNameSuccess(text))
    }
}

const changeRecipeNameSuccess = name => ({
    type: types.CHANGE_RECIPE_NAME,
    recipeName: name
})

const getUserRecipesSuccess = recipes => ({
    type: types.GET_USER_RECIPES,
    recipes
})

const userRecipeAdded = recipe => ({
    type: types.ADD_USER_RECIPE,
    recipe
})

const searchRecipesSuccess = recipes => ({
    type: types.SEARCH_RECIPES,
    recipes,
})

const getRecipeDetailsSuccess = recipe => ({
    type: types.GET_RECIPE_DETAILS,
    recipe
})

const recipeDetailsLoading = () => ({
    type: types.RECIPE_DETAILS_LOADING
})

const recipeListLoading = () => ({
    type: types.RECIPE_LIST_LOADING
})

const recipeListLoaded = () => ({
    type: types.RECIPE_LIST_LOADED
})

const askByImageSuccess = recipes => ({
    type: types.ASK_BY_IMAGE,
    recipes,
})