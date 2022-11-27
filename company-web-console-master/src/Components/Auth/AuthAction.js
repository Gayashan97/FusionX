import * as actionTypes  from './AuthActionTypes';
import {post} from '../CommonComponents/Api';
import {toast} from 'react-toastify';

export const loginSuccess = (values) => {
    return dispatch => {
        dispatch({
            type: actionTypes.FETCH_LOGIN
        });
        const url = `/LogIn`;
        post(url, values)
            .then(res => {
                dispatch({
                    type: actionTypes.FETCH_LOGIN_SUCCESS,
                    payload: res.data,
                })
                toast.success("Login Successful")
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.FETCH_LOGIN_ERROR,
                    payload: error,
                })
                toast.error("Invalid username or password")
            });
    };
};

export const loginClearDetails = (values) => {
    return dispatch => {
        dispatch({
            type: actionTypes.CLEAR_LOGIN_DETAILS
        });
    };
};