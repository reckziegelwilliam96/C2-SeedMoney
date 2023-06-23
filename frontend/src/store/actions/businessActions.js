import SeedMoneyApi from '../../SeedMoneyApi';
import { SET_BUSINESS, REMOVE_BUSINESS } from './actionTypes'; 

export const setBusiness = (business) => {
    return {
        type: SET_BUSINESS,
        payload: business
    }
};

export const removeBusiness = () => {
    return {
        type: REMOVE_BUSINESS,
    }
};

export const registerBusiness = businessDetails => async dispatch => {
    const result = await SeedMoneyApi.registerBusiness(businessDetails);
    dispatch(setBusiness(result.business));
    return result.business;
};