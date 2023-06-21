import SeedMoneyApi from '../../SeedMoneyApi';
import { SET_BUSINESS, SET_BUSINESS_START } from './actionTypes'; 

export const setBusiness = (business) => {
    return {
        type: SET_BUSINESS,
        payload: business
    }
};

export const startSetBusiness = () => {
    return {
        type: SET_BUSINESS_START
    }
};

export const registerBusiness = businessDetails => async dispatch => {
    dispatch(startSetBusiness());
    const result = await SeedMoneyApi.registerBusiness(businessDetails);
    dispatch(setBusiness(result.business));
    return result.business;
};