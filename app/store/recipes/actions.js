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

const searchRecipesSuccess = recipes => ({
    type: types.SEARCH_RECIPES,
    recipes
})