import * as actionTypes from './ActivityActionTypes';

export const activityReducer = (
    state = {
        fetching: false,
        error: {
            status: false,
            message: ''
        },
        data:{}
    },
    action
) => {
    switch (action.type) {
        case actionTypes.FETCH_ACTIVITY_LIST:
            return {
                ...state,
                activityDetails: {
                    ...state.activityDetails,
                    fetching: true,
                    error: { status: false, message: '' },
                    data:{}
                }
            };
        case actionTypes.FETCH_ACTIVITY_LIST_SUCCESS:
            return {
                ...state,
                activityDetails: {
                    ...state.activityDetails,
                    fetching: false,
                    error: { status: false, message: '' },
                    data:action.payload
                }
            };
        case actionTypes.FETCH_ACTIVITY_LIST_ERROR:
            return {
                ...state,
                activityDetails: {
                    ...state.activityDetails,
                    fetching: false,
                    error: { status: true, message: action.payload },
                    data:{}
                }
            };

        case actionTypes.FETCH_ACTIVITY_LOGS:
            return {
                ...state,
                activityLogs: {
                    ...state.activityLogs,
                    fetching: true,
                    error: { status: false, message: '' },
                    data: {}
                }
            };
        case actionTypes.FETCH_ACTIVITY_LOGS_SUCCESS:
            return {
                ...state,
                activityLogs: {
                    ...state.activityLogs,
                    fetching: false,
                    error: { status: false, message: '' },
                    data: action.payload
                }
            };
        case actionTypes.FETCH_ACTIVITY_LOGS_ERROR:
            return {
                ...state,
                activityLogs: {
                    ...state.activityLogs,
                    fetching: false,
                    error: { status: true, message: action.payload },
                    data: {}
                }
            };

        case actionTypes.FETCH_ACTIVITY_LOGS_TYPES:
            return {
                ...state,
                activityLogTypes: {
                    ...state.activityLogTypes,
                    fetching: true,
                    error: { status: false, message: '' },
                    data: {}
                }
            };
        case actionTypes.FETCH_ACTIVITY_LOGS_TYPES_SUCCESS:
            return {
                ...state,
                activityLogTypes: {
                    ...state.activityLogTypes,
                    fetching: false,
                    error: { status: false, message: '' },
                    data: action.payload
                }
            };
        case actionTypes.FETCH_ACTIVITY_LOGS_TYPES_ERROR:
            return {
                ...state,
                activityLogTypes: {
                    ...state.activityLogTypes,
                    fetching: false,
                    error: { status: true, message: action.payload },
                    data: {}
                }
            };

        case actionTypes.SAVE_ACTIVITY_LOGS_TYPES:
            return {
                ...state,
                saveActivityLog: {
                    ...state.saveActivityLog,
                    fetching: true,
                    error: { status: false, message: '' },
                    data: {}
                }
            };
        case actionTypes.SAVE_ACTIVITY_LOGS_TYPES_SUCCESS:
            return {
                ...state,
                saveActivityLog: {
                    ...state.saveActivityLog,
                    fetching: false,
                    error: { status: false, message: '' },
                    data: action.payload
                }
            };
        case actionTypes.SAVE_ACTIVITY_LOGS_TYPES_ERROR:
            return {
                ...state,
                saveActivityLog: {
                    ...state.saveActivityLog,
                    fetching: false,
                    error: { status: true, message: action.payload },
                    data: {}
                }
            };

        case actionTypes.FETCH_ACTIVITY_EVENT_TYPES:
            return {
                ...state,
                getActivityLogsByEvent: {
                    ...state.getActivityLogsByEvent,
                    fetching: true,
                    error: { status: false, message: '' },
                    data: {}
                }
            };
        case actionTypes.FETCH_ACTIVITY_EVENT_TYPES_SUCCESS:
            return {
                ...state,
                getActivityLogsByEvent: {
                    ...state.getActivityLogsByEvent,
                    fetching: false,
                    error: { status: false, message: '' },
                    data: action.payload
                }
            };
        case actionTypes.FETCH_ACTIVITY_EVENT_TYPES_ERROR:
            return {
                ...state,
                getActivityLogsByEvent: {
                    ...state.getActivityLogsByEvent,
                    fetching: false,
                    error: { status: true, message: action.payload },
                    data: {}
                }
            };

        default:
            return state;
    }
};