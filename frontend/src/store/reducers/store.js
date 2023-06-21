import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // This defaults to localStorage for web
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import userReducer from './userReducer';
import farmReducer from './farmReducer';
import businessReducer from './businessReducer';

const rootReducer = combineReducers({
    user: userReducer,
    farm: farmReducer,
    business: businessReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
 };

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
export const persistor = persistStore(store);
