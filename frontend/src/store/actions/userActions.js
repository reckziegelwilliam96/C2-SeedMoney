import SeedMoneyApi from '../../SeedMoneyApi';
import { LOGIN_USER, LOGOUT_USER } from './actionTypes'; 

export const loginUser = (user, token) => {
    return {
        type: LOGIN_USER,
        payload: {
            user,
            token
        }
    }
};

export const logOutUser = () => {
    return {
        type: LOGOUT_USER
    }
};

export const login = user => async dispatch => {
  const result = await SeedMoneyApi.logInUser(user);
  dispatch(loginUser(result.user, result.token));
  return result.user;
};

export const signup = user => async dispatch => {
  const result = await SeedMoneyApi.registerUser(user);
  dispatch(loginUser(result.user, result.token));
  return result.user;
};

export const logout = () => dispatch => {
  dispatch(logOutUser());
};
