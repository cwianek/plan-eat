import { combineReducers } from 'redux';

import session from './session';
import recipes from './recipes';
import products from './products';

export default combineReducers({
    session, recipes, products
});
