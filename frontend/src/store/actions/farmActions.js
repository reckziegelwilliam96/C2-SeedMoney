import SeedMoneyApi from '../../SeedMoneyApi';
import { SET_FARM } from './actionTypes'; 

export const setFarm = (farm) => {
    return {
        type: SET_FARM,
        payload: farm
    }
};

export const registerFarm = farmDetails => async dispatch => {
    const result = await SeedMoneyApi.registerFarm(farmDetails);
    dispatch(setFarm(result.farm));
    return result.farm;
  };