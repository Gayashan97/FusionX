import * as actionTypes  from '../ActivityList/ActivityActionTypes';
import {toast} from 'react-toastify';
import {get,post} from '../CommonComponents/Api';

export const activitySuccess = (values) => {
    return dispatch => {
        dispatch({
            type: actionTypes.FETCH_ACTIVITY_LIST
        });
        const url = `/GetAllActivities`;
        get(url, values)
            .then(res => {
                dispatch({
                    type: actionTypes.FETCH_ACTIVITY_LIST_SUCCESS,
                    payload: res.data,
                })
                // toastr.success("Successfully Saved")
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.FETCH_ACTIVITY_LIST_ERROR,
                    payload: error,
                })
                toast.error(error)
            });
    };
};

export const getActivityLogs = (id) => {
    return dispatch => {
        dispatch({
            type: actionTypes.FETCH_ACTIVITY_LOGS
        });
        const url = `/GetActivityLogsById/${id}`;
        get(url)
            .then(res => {
                dispatch({
                    type: actionTypes.FETCH_ACTIVITY_LOGS_SUCCESS,
                    payload: res.data,
                })
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.FETCH_ACTIVITY_LOGS_ERROR,
                    payload: error,
                })
            });
    };
};

export const getActivityLogTypes = () => {
    return dispatch => {
        dispatch({
            type: actionTypes.FETCH_ACTIVITY_LOGS_TYPES
        });
        const url = `/GetAllActivityLogTypes`;
        get(url)
            .then(res => {
                dispatch({
                    type: actionTypes.FETCH_ACTIVITY_LOGS_TYPES_SUCCESS,
                    payload: res.data,
                })
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.FETCH_ACTIVITY_LOGS_TYPES_ERROR,
                    payload: error,
                })
            });
    };
};

export const saveActivityLogTypes = (values) => {
    return dispatch => {
        dispatch({
            type: actionTypes.SAVE_ACTIVITY_LOGS_TYPES
        });
        const url = `/SaveActivityLog`;
        post(url, values)
            .then(res => {
                dispatch({
                    type: actionTypes.SAVE_ACTIVITY_LOGS_TYPES_SUCCESS,
                    payload: res.data,
                })
                toast.success("Successfully Saved")
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.SAVE_ACTIVITY_LOGS_TYPES_ERROR,
                    payload: error,
                })
            });
    };
};

export const getActivityEventTypes = (id) => {
    return dispatch => {
        dispatch({
            type: actionTypes.FETCH_ACTIVITY_EVENT_TYPES
        });
        const url = `/GetActivityLogsByActivityId/${id}`;
        get(url)
            .then(res => {
                dispatch({
                    type: actionTypes.FETCH_ACTIVITY_EVENT_TYPES_SUCCESS,
                    payload: res.data,
                })
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.FETCH_ACTIVITY_EVENT_TYPES_ERROR,
                    payload: error,
                })
            });
    };
};