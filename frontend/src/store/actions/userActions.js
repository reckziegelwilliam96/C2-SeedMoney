import { LOGIN_USER, SET_USER, LOGOUT_USER } from './actionTypes'; 

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
};

export const loginUser = (user, token) => {
    return {
        type: LOGIN_USER,
        payload: {
            user,
            token
        }
    }
};

export const logoutUser = () => {
    return {
        type: LOGOUT_USER
    }
};
