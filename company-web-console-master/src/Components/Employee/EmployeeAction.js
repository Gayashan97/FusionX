import * as actionTypes  from '../Employee/EmployeeActionTypes';
import {toast} from 'react-toastify';
import {post,get} from '../CommonComponents/Api';

export const saveEmployee = (values) => {
    return dispatch => {
        dispatch({
            type: actionTypes.SAVE_EMPLOYEE
        });
        const url = `/SaveEmployee`;
        post(url, values)
            .then(res => {
                dispatch({
                    type: actionTypes.SAVE_EMPLOYEE_SUCCESS,
                    payload: res.data,
                })
                toast.success("Successfully Saved")
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.SAVE_EMPLOYEE_ERROR,
                    payload: error,
                })
                toast.error("Error occured while saving")
            });
    };
};

export const viewEmployee = (values) => {
    return dispatch => {
        dispatch({
            type: actionTypes.VIEW_EMPLOYEE
        });
        const url = `/GetAllEmployees`;
        get(url, values)
            .then(res => {
                dispatch({
                    type: actionTypes.VIEW_EMPLOYEE_SUCCESS,
                    payload: res.data,
                })
                toast.success("Successfully Data Received")
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.VIEW_EMPLOYEE_ERROR,
                    payload: error,
                })
                toast.error("Error occured while Receiving Data")
            });
    };
};