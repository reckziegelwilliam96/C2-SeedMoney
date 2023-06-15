
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from './userReducer';
import farmReducer from './farmReducer';
import businessReducer from './businessReducer';

const rootReducer = combineReducers({
    user: userReducer,
    farm: farmReducer,
    business: businessReducer,
});

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
