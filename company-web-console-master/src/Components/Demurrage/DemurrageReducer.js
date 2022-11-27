import * as actionTypes from './DemurrageActionTypes';

export const demurrageReducer = (
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
        case actionTypes.GET_DEMURRAGE_CALCULATON:
            return {
                ...state,
                demurrageDetails: {
                    ...state.demurrageDetails,
                    fetching: true,
                    error: { status: false, message: '' },
                    data:{}
                }
            };
        case actionTypes.GET_DEMURRAGE_CALCULATON_SUCCESS:
            return {
                ...state,
                demurrageDetails: {
                    ...state.demurrageDetails,
                    fetching: false,
                    error: { status: false, message: '' },
                    data:action.payload
                }
            };
        case actionTypes.GET_DEMURRAGE_CALCULATON_ERROR:
            return {
                ...state,
                demurrageDetails: {
                    ...state.demurrageDetails,
                    fetching: false,
                    error: { status: true, message: action.payload },
                    data:{}
                }
            };

        default:
            return state;
    }
};