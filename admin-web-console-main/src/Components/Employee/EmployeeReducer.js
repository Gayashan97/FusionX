import * as actionTypes from './EmployeeActionTypes';

export const employeeReducer = (
    state = {
        fetching: false,
        error: {
            status: false,
            message: ''
        },
        data:{},
        saveSuccess:false
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
                    data:{},
                    saveSuccess:false              
                 }
            };
        case actionTypes.SAVE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                employeeDetails: {
                    ...state.employeeDetails,
                    fetching: false,
                    error: { status: false, message: '' },
                    data:action.payload,
                    saveSuccess:true
                }
            };
        case actionTypes.SAVE_EMPLOYEE_ERROR:
            return {
                ...state,
                employeeDetails: {
                    ...state.employeeDetails,
                    fetching: false,
                    error: { status: true, message: action.payload },
                    data:{},
                    saveSuccess:false
                }
            };
            case actionTypes.UPDATE_EMPLOYEE:
                return {
                    ...state,
                    employeeDetails: {
                        ...state.employeeDetails,
                        fetching: true,
                        error: { status: false, message: '' },
                        data:{},
                        saveSuccess:false              
                     }
                };
            case actionTypes.UPDATE_EMPLOYEE_SUCCESS:
                return {
                    ...state,
                    employeeDetails: {
                        ...state.employeeDetails,
                        fetching: false,
                        error: { status: false, message: '' },
                        data:action.payload,
                        saveSuccess:true
                    }
                };
            case actionTypes.UPDATE_EMPLOYEE_ERROR:
                return {
                    ...state,
                    employeeDetails: {
                        ...state.employeeDetails,
                        fetching: false,
                        error: { status: true, message: action.payload },
                        data:{},
                        saveSuccess:false
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

                case actionTypes.VIEW_EMPLOYEE_BY_ID:
                    return {
                        ...state,
                        employeeById: {
                            ...state.employeeById,
                            fetching: true,
                            error: { status: false, message: '' },
                            data: {}
                        }
                    };
                case actionTypes.VIEW_EMPLOYEE_BY_ID_SUCCESS:
                    return {
                        ...state,
                        employeeById: {
                            ...state.employeeById,
                            fetching: false,
                            error: { status: false, message: '' },
                            data: action.payload
                        }
                    };
                case actionTypes.VIEW_EMPLOYEE_BY_ID_ERROR:
                    return {
                        ...state,
                        employeeById: {
                            ...state.employeeById,
                            fetching: false,
                            error: { status: true, message: action.payload },
                            data: {}
                        }
                    };
                    case actionTypes.CLEAR_EMPLOYEE_DETAILS:
                        return {
                            ...state,
                            employeeDetails: {
                                ...state.employeeDetails,
                                fetching: true,
                                error: { status: false, message: '' },
                                data:{},
                                saveSuccess:false              
                             }
                        };

        default:
            return state;
    }
};