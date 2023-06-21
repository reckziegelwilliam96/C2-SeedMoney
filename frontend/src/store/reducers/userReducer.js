const initialState = {
    user: null,
    token: null,
    fetched: false,
    loading: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGNUP_START':
            return {
                ...state,
                loading: true,
            };
        case 'LOGIN_USER':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                fetched: true,
                loading: false
            };
        case 'LOGOUT_USER':
            return {
                ...state,
                user: null,
                token: null,
                fetched: false,
                loading: false
            };
        default:
            return state;
    }
};

export default userReducer;
