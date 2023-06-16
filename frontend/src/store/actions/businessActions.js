import SeedMoneyApi from '../../SeedMoneyApi';
import { SET_BUSINESS } from './actionTypes'; 

export const setBusiness = (business) => {
    return {
        type: SET_BUSINESS,
        payload: business
    }
};

export const registerBusiness = businessDetails => async dispatch => {
    const result = await SeedMoneyApi.registerBusiness(businessDetails);
    dispatch(setBusiness(result.business));
    return result.business;
};