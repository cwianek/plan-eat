import * as types from './actionTypes'

const initialState = {
    recipesList: [],
    currentRecipe: null,
    listLoading: null,
    userRecipes: null,
    currentDayRecipes: [],
    recipeName: '',
    currentDayCalories: 0
}

const recipes = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_RECIPE_NAME:
            return { ...state, recipeName: action.recipeName}
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
            return { ...state, currentDayRecipes: [...state.currentDayRecipes, action.recipe]}
        case types.GET_USER_RECIPES:
            return { ...state, userRecipes: action.recipes}
        case types.ASK_BY_IMAGE:
            return { ...state, recipesList: action.recipes}
        case types.GET_CURRENT_DAY_RECIPES:
            return { ...state, currentDayRecipes: action.recipes}
        case types.CURRENT_DAY_CALORIES:
            return { ... state, currentDayCalories: action.calories}
    }
    return state;
}

export default recipes;