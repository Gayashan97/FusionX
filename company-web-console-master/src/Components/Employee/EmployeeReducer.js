import * as actionTypes from './EmployeeActionTypes';

export const employeeReducer = (
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
        case actionTypes.SAVE_EMPLOYEE:
            return {
                ...state,
                employeeDetails: {
                    ...state.employeeDetails,
                    fetching: true,
                    error: { status: false, message: '' },
                    data:{}
                }
            };
        case actionTypes.SAVE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                employeeDetails: {
                    ...state.employeeDetails,
                    fetching: false,
                    error: { status: false, message: '' },
                    data:action.payload
                }
            };
        case actionTypes.SAVE_EMPLOYEE_ERROR:
            return {
                ...state,
                employeeDetails: {
                    ...state.employeeDetails,
                    fetching: false,
                    error: { status: true, message: action.payload },
                    data:{}
                }
            };

            case actionTypes.VIEW_EMPLOYEE:
                return {
                    ...state,
                    allEmployeeDetails: {
                        ...state.allEmployeeDetails,
                        fetching: true,
                        error: { status: false, message: '' },
                        data:{}
                    }
                };
            case actionTypes.VIEW_EMPLOYEE_SUCCESS:
                return {
                    ...state,
                    allEmployeeDetails: {
                        ...state.allEmployeeDetails,
                        fetching: false,
                        error: { status: false, message: '' },
                        data:action.payload
                    }
                };
            case actionTypes.VIEW_EMPLOYEE_ERROR:
                return {
                    ...state,
                    allEmployeeDetails: {
                        ...state.allEmployeeDetails,
                        fetching: false,
                        error: { status: true, message: action.payload },
                        data:{}
                    }
                };

        default:
            return state;
    }
};