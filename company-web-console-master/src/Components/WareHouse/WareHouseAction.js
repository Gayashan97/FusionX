import * as actionTypes  from './WareHouseActionTypes';
import {toast} from 'react-toastify';
import {get, post} from '../CommonComponents/Api';

export const wareHouseSave = (values) => {
    return dispatch => {
        dispatch({
            type: actionTypes.WARE_HOUSE_DETALS_SAVE
        });
        const url = `/SaveWareHouseItems`;
        post(url, values)
            .then(res => {
                dispatch({
                    type: actionTypes.WARE_HOUSE_DETALS_SAVE_SUCCESS,
                    payload: res.data,
                })
                toast.success("Successfully Saved")
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.WARE_HOUSE_DETALS_SAVE_ERROR,
                    payload: error,
                })
                toast.error(error)
            });
    };
};

export const viewWareHouseDetails = (values) => {
    return dispatch => {
        dispatch({
            type: actionTypes.VIEW_WARE_HOUSE_DETALS
        });
        const url = `/GetAllWareHouseItems`;
        get(url, values)
            .then(res => {
                dispatch({
                    type: actionTypes.VIEW_WARE_HOUSE_DETALS_SUCCESS,
                    payload: res.data,
                })
                toast.success("Data Received")
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.VIEW_WARE_HOUSE_DETALS_ERROR,
                    payload: error,
                })
                toast.error(error)
            });
    };
};
