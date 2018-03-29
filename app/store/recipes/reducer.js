import * as types from './actionTypes'

const initialState = {
    recipesList: [],
    currentRecipe: null,
}

const recipes = (state = initialState, action) => {
    switch (action.type) {
        case types.SEARCH_RECIPES:
            return { ...state, recipesList: action.recipes, currentRecipe: null }
        case types.GET_RECIPE_DETAILS:
            return { ...state, currentRecipe: action.recipe }
    }
    return state;
}

export default recipes;