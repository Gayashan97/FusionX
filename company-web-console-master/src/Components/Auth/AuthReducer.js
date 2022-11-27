import * as actionTypes from './AuthActionTypes';

export const authReducer = (
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
        case actionTypes.FETCH_LOGIN:
            return {
                ...state,
                authDetails: {
                    ...state.authDetails,
                    fetching: true,
                    error: { status: false, message: '' },
                    data:{}
                }
            };

        case actionTypes.FETCH_LOGIN_SUCCESS:
            return {
                ...state,
                authDetails: {
                    ...state.authDetails,
                    fetching: false,
                    error: { status: false, message: '' },
                    data:action.payload
                }
            };

        case actionTypes.FETCH_LOGIN_ERROR:
            return {
                ...state,
                authDetails: {
                    ...state.authDetails,
                    fetching: false,
                    error: { status: true, message: action.payload },
                    data:{}
                }
            };

        case actionTypes.CLEAR_LOGIN_DETAILS:
            return {
                ...state,
                authDetails: {
                    ...state.authDetails,
                    fetching: false,
                    error: { status: false, message:'' },
                    data: {}
                }
            };

        default:
            return state;
    }
};