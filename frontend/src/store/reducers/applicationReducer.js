const initialState = {
    application: null,
    fetched: false,
    loading: false
};

const applicationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_APPLICATION':
            return {
                ...state,
                application: action.payload,
                fetched: true,
                loading: false
            };
        case 'REMOVE_CURRENT_APPLICATION':
            return {
                ...state,
                application: null,
                fetched: false,
                loading: false
            };
        default:
            return state;
    }
};

export default applicationReducer;
