const initialState = {
    farm: null,
    fetched: false,
    loading: false
};

const farmReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FARM':
            return {
                ...state,
                farm: action.payload,
                fetched: true,
                loading: false
            };
        case 'REMOVE_FARM':
            return {
                ...state,
                farm: null,
                fetched: false,
                loading: false
            };
        default:
            return state;
    }
};

export default farmReducer;
