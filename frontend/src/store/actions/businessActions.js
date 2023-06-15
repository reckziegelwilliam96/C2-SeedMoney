import { SET_BUSINESS } from './actionTypes'; 

export const setBusiness = (business) => {
    return {
        type: SET_BUSINESS,
        payload: business
    }
};
