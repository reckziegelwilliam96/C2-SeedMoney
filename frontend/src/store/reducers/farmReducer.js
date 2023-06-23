const initialState = {
    farm: null
};

const farmReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FARM':
            return {
                ...state,
                farm: action.payload
            };
        case 'REMOVE_FARM':
            return {
                ...state,
                farm: null
            };
        default:
            return state;
    }
};

export default farmReducer;
