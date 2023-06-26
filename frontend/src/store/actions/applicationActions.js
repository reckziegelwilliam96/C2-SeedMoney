import SeedMoneyApi from '../../SeedMoneyApi';
import { SET_CURRENT_APPLICATION, REMOVE_CURRENT_APPLICATION } from './actionTypes'; 

export const setCurrentApplication = (application) => {
    return {
        type: SET_CURRENT_APPLICATION,
        payload: application
    }
};

export const removeCurrentApplication = () => {
    return {
        type: REMOVE_CURRENT_APPLICATION
    }
};

export const fetchAndSetApplication = id => async dispatch => {
    const result = await SeedMoneyApi.getUserApplications(id);
    dispatch(setCurrentApplication(result.application));
    return result.application;
};