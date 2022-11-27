import * as actionTypes  from '../ThirdParty/ThirdPartyActionTypes';
import {toast} from 'react-toastify';
import {post,get, put} from '../CommonComponents/Api';

export const saveThirdParty = (values) => {
    return dispatch => {
        dispatch({
            type: actionTypes.SAVE_THIRDPARTY
        });
        const url = `/SaveThirdPartyUser`;
        post(url, values)
            .then(res => {
                dispatch({
                    type: actionTypes.SAVE_THIRDPARTY_SUCCESS,
                    payload: res.data,
                })
                toast.success("Successfully Saved ✔️ ")
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.SAVE_THIRDPARTY_ERROR,
                    payload: error,
                })
                toast.error("Error occured while saving ⚠️")
            });
    };
};

export const viewThirdParty = (values) => {
    return dispatch => {
        dispatch({
            type: actionTypes.VIEW_THIRDPARTY
        });
        const url = `/GetAllThirdPartyUsers`;
        get(url, values)
            .then(res => {
                dispatch({
                    type: actionTypes.VIEW_THIRDPARTY_SUCCESS,
                    payload: res.data,
                })
                toast.success("Action Successful  ✔️ ")
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.VIEW_THIRDPARTY_ERROR,
                    payload: error,
                })
                toast.error("Error occured while Receiving Data ⚠️")
            });
    };
};

export const updateThirdParty = (values, id) => {
    return dispatch => {
        dispatch({
            type: actionTypes.UPDATE_THIRDPARTY
        });
        const url = `/UpdateThirdPartyUser/${id}`;
        put(url, values)
            .then(res => {
                dispatch({
                    type: actionTypes.UPDATE_THIRDPARTY_SUCCESS,
                    payload: res.data,
                })
                toast.success("Successfully Updated ✔️ ")
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.UPDATE_THIRDPARTY_ERROR,
                    payload: error,
                })
                toast.error("Error occured while Updating ⚠️")
            });
    };
};

export const getThirdPartyUserById = (id) => {
    return dispatch => {
        dispatch({
            type: actionTypes.VIEW_THIRDPARTY_BY_ID
        });
        const url = `/GetThirdPartyUserById/${id}`;
        get(url)
            .then(res => {
                dispatch({
                    type: actionTypes.VIEW_THIRDPARTY_BY_ID_SUCCESS,
                    payload: res.data,
                })
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.VIEW_THIRDPARTY_BY_ID_ERROR,
                    payload: error,
                })
            });
    }; 
};

export const clearThirdPartyDetails = () => {
    return  {
            type: actionTypes.CLEAR_THIRDPARTY_DETAILS ,
    }
}