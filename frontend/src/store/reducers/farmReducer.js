const initialState = {
    farm: null
};

const farmReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FARM':
            return action.payload;
        default:
            return state;
    }
};

export default farmReducer;
