import * as types from './actionTypes'

const initialState = {
    products: [],
    productsLoading: null,
    userProducts: []
}

const recipes = (state = initialState, action) => {
    switch (action.type) {
        case types.SEARCH_PRODUCTS:
            return { ...state, products: action.products }
        case types.PRODUCTS_LIST_LOADING:
            return { ...state, productsLoading: true }
        case types.PRODUCTS_LIST_LOADED:
            return { ...state, productsLoading: false }
        case types.ADD_USER_PRODUCT:
            return { ...state, userProducts: [...state.userProducts, action.product] }
        case types.REMOVE_USER_PRODUCT:
            return { ...state, userProducts: action.products }
        case types.LOAD_USER_PRODUCTS:
            return { ...state, userProducts: action.products }
    }
    return state;
}

export default recipes;