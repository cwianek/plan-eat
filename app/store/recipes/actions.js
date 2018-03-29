import * as types from './actionTypes';
import axios from 'axios';
import ROOT_URL from '../../config/endpoint';

export const searchRecipes = (name) => {
    return (dispatch) => {
        console.log("SearchRecipes");
        axios.post(`${ROOT_URL}/food`, {
            name
        })
            .then(function (response) {
                console.log("Response searchSrecipes");
                dispatch(searchRecipesSuccess(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export const getRecipeDetails = (id) => {
    return (dispatch) => {
        console.log(id);
        axios.post(`${ROOT_URL}/details`, {
            id
        })
            .then(function (response) {
                console.log(response);
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