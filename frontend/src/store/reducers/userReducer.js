const initialState = {
    user: null,
    token: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token
            };
        case 'LOGOUT_USER':
            return {
                ...state,
                user: null,
                token: null
            };
        default:
            return state;
    }
};

export default userReducer;
