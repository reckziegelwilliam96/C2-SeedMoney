const initialState = {
    application: null,
};

const applicationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_APPLICATION':
            return {
                ...state,
                application: action.payload,
            };
        case 'REMOVE_CURRENT_APPLICATION':
            return {
                ...state,
                application: null,
            };
        default:
            return state;
    }
};

export default applicationReducer;
