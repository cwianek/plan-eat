import * as types from './actionTypes'

const initialState = {
    recipesList: []
}

const recipes = (state = initialState, action) => {
    switch (action.type) {
        case types.SEARCH_RECIPES:
            return { ...state, recipesList: action.recipes }
    }
    return state;
}

export default recipes;