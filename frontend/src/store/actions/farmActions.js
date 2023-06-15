import { SET_FARM } from './actionTypes'; 

export const setFarm = (farm) => {
    return {
        type: SET_FARM,
        payload: farm
    }
};
