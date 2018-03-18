import { combineReducers } from 'redux';

import session from './session';
import recipes from './recipes'

export default combineReducers({
    session, recipes
});
