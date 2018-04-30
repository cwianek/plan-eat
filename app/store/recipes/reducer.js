import * as types from './actionTypes'

const initialState = {
    recipesList: [],
    currentRecipe: null,
    listLoading: null,
    userRecipes: null,
}

const recipes = (state = initialState, action) => {
    switch (action.type) {
        case types.SEARCH_RECIPES:
            return { ...state, recipesList: action.recipes, currentRecipe: null }
        case types.GET_RECIPE_DETAILS:
            return { ...state, currentRecipe: action.recipe }
        case types.RECIPE_DETAILS_LOADING:
            return { ...state, currentRecipe: null }
        case types.RECIPE_LIST_LOADING:
            return { ...state, listLoading: true }
        case types.RECIPE_LIST_LOADED:
            return { ...state, listLoading: false }
        case types.ADD_USER_RECIPE:
            return { ...state}
        case types.GET_USER_RECIPES:
            return { ...state, userRecipes: action.recipes}
    }
    return state;
}

export default recipes;