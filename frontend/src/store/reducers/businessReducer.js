const initialState = {
    business: null,
    fetched: false,
    loading: null
};

const businessReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_BUSINESS_START':
            return {
                ...state,
                loading: true,
            };
        case 'SET_BUSINESS':
            return {
                ...state,
                business: action.payload,
                fetched: true,
                loading: false
            };
        case 'REMOVE_BUSINESS':
            return {
                ...state,
                business: null,
                fetched: false,
                loading: false
            };
        default:
            return state;
    }
};

export default businessReducer;
