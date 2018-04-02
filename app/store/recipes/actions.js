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
                console.log("Response searchSrecipes");
                dispatch(searchRecipesSuccess(response.data));
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

const searchRecipesSuccess = recipes => ({
    type: types.SEARCH_RECIPES,
    recipes
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