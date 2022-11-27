import * as actionTypes  from '../Employee/EmployeeActionTypes';
import {toast} from 'react-toastify';
import {post,get, put} from '../CommonComponents/Api';

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
                toast.success("Successfully Saved ✔️ ")
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.SAVE_EMPLOYEE_ERROR,
                    payload: error,
                })
                toast.error("Error occured while saving ⚠️")
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
                toast.success("Action Successful  ✔️ ")
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.VIEW_EMPLOYEE_ERROR,
                    payload: error,
                })
                toast.error("Error occured while Receiving Data ⚠️")
            });
    };
};

export const updateEmployee = (values, id) => {
    return dispatch => {
        dispatch({
            type: actionTypes.UPDATE_EMPLOYEE
        });
        const url = `/UpdateEmployee/${id}`;
        put(url, values)
            .then(res => {
                dispatch({
                    type: actionTypes.UPDATE_EMPLOYEE_SUCCESS,
                    payload: res.data,
                })
                toast.success("Successfully Updated ✔️ ")
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.UPDATE_EMPLOYEE_ERROR,
                    payload: error,
                })
                toast.error("Error occured while Updating ⚠️")
            });
    };
};

export const getEmployeeById = (id) => {
    return dispatch => {
        dispatch({
            type: actionTypes.VIEW_EMPLOYEE_BY_ID
        });
        const url = `/GetEmployeeById/${id}`;
        get(url)
            .then(res => {
                dispatch({
                    type: actionTypes.VIEW_EMPLOYEE_BY_ID_SUCCESS,
                    payload: res.data,
                })
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.VIEW_EMPLOYEE_BY_ID_ERROR,
                    payload: error,
                })
            });
    };
};

export const clearEmployeeDetails = () => {
    return  {
            type: actionTypes.CLEAR_EMPLOYEE_DETAILS ,
    }
}