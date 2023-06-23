import { LOGIN_USER, LOGOUT_USER } from '../actions/actionTypes';
import SeedMoneyApi from '../../SeedMoneyApi';

const tokenMiddleware = store => next => action => {
    let result = next(action);
    
    // If the action updates the token, also update it in SeedMoneyApi
    if (action.type === LOGIN_USER) {
      SeedMoneyApi.token = action.payload.token;
    }
    
    if (action.type === LOGOUT_USER) {
        SeedMoneyApi.token = null;
    }

    return result;
  };

export default tokenMiddleware;