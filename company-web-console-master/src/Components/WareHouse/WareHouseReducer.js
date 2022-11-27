import * as actionTypes from './WareHouseActionTypes';

export const wareHouseReducer = (
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
        case actionTypes.WARE_HOUSE_DETALS_SAVE:
            return {
                ...state,
                saveWareHouseDetails: {
                    ...state.saveWareHouseDetails,
                    fetching: true,
                    error: { status: false, message: '' },
                    data:{}
                }
            };
        case actionTypes.WARE_HOUSE_DETALS_SAVE_SUCCESS:
            return {
                ...state,
                saveWareHouseDetails: {
                    ...state.saveWareHouseDetails,
                    fetching: false,
                    error: { status: false, message: '' },
                    data:action.payload
                }
            };
        case actionTypes.WARE_HOUSE_DETALS_SAVE_ERROR:
            return {
                ...state,
                saveWareHouseDetails: {
                    ...state.saveWareHouseDetails,
                    fetching: false,
                    error: { status: true, message: action.payload },
                    data:{}
                }
            };

        case actionTypes.VIEW_WARE_HOUSE_DETALS:
            return {
                ...state,
                viewWareHouseDetails: {
                    ...state.viewWareHouseDetails,
                    fetching: true,
                    error: { status: false, message: '' },
                    data: {}
                }
            };
        case actionTypes.VIEW_WARE_HOUSE_DETALS_SUCCESS:
            return {
                ...state,
                viewWareHouseDetails: {
                    ...state.viewWareHouseDetails,
                    fetching: false,
                    error: { status: false, message: '' },
                    data: action.payload
                }
            };
        case actionTypes.VIEW_WARE_HOUSE_DETALS_ERROR:
            return {
                ...state,
                viewWareHouseDetails: {
                    ...state.viewWareHouseDetails,
                    fetching: false,
                    error: { status: true, message: action.payload },
                    data: {}
                }
            };

        default:
            return state;
    }
};