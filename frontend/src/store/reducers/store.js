
import { combineReducers, createStore } from 'redux';
import userReducer from './userReducer';
import farmReducer from './farmReducer';
import businessReducer from './businessReducer';

const rootReducer = combineReducers({
    user: userReducer,
    farm: farmReducer,
    business: businessReducer,
});

export default createStore(rootReducer);