import * as types from './actionTypes'

const initialState = {
    loading: false,
    user: null,
    error: null,
}

const session = (state = initialState, action) => {
    switch (action.type) {
        case types.SESSION_LOADING:
            return { ...state, loading: true }
        case types.SESSION_ERROR:
            return { loading: false, error: true, user: null }
        case types.SESSION_SUCCESS:
            return { loading: false, user: action.user, error: null }
        case types.SESSION_LOGOUT:
            return { loading: false, error: null, user: null }
        case types.SESSION_RESTORING:
            return { ...state }
    }
    return state;
}

export default session;