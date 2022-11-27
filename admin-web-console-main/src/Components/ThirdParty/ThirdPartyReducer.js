import * as actionTypes from './ThirdPartyActionTypes';

export const thirdPartyReducer = (
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
        case actionTypes.SAVE_THIRDPARTY:
            return {
                ...state,
                thirdPartyDetails: {
                    ...state.thirdPartyDetails,
                    fetching: true,
                    error: { status: false, message: '' },
                    data:{},
                    saveSuccess:false     
                }
            };
        case actionTypes.SAVE_THIRDPARTY_SUCCESS:
            return {
                ...state,
                thirdPartyDetails: {
                    ...state.thirdPartyDetails,
                    fetching: false,
                    error: { status: false, message: '' },
                    data:action.payload,
                    saveSuccess:true     
                }
            };
        case actionTypes.SAVE_THIRDPARTY_ERROR:
            return {
                ...state,
                thirdPartyDetails: {
                    ...state.thirdPartyDetails,
                    fetching: false,
                    error: { status: true, message: action.payload },
                    data:{},
                    saveSuccess:false     
                }
            };
            case actionTypes.UPDATE_THIRDPARTY:
                return {
                    ...state,
                    thirdPartyDetails: {
                        ...state.thirdPartyDetails,
                        fetching: true,
                        error: { status: false, message: '' },
                        data:{},
                        saveSuccess:false     
                    }
                };
            case actionTypes.UPDATE_THIRDPARTY_SUCCESS:
                return {
                    ...state,
                    thirdPartyDetails: {
                        ...state.thirdPartyDetails,
                        fetching: false,
                        error: { status: false, message: '' },
                        data:action.payload,
                        saveSuccess:true     
                    }
                };
            case actionTypes.UPDATE_THIRDPARTY_ERROR:
                return {
                    ...state,
                    thirdPartyDetails: {
                        ...state.thirdPartyDetails,
                        fetching: false,
                        error: { status: true, message: action.payload },
                        data:{},
                        saveSuccess:false     
                    }
                };

            case actionTypes.VIEW_THIRDPARTY:
                return {
                    ...state,
                    allThirdPartyDetails: {
                        ...state.allThirdPartyDetails,
                        fetching: true,
                        error: { status: false, message: '' },
                        data:{}
                    }
                };
            case actionTypes.VIEW_THIRDPARTY_SUCCESS:
                return {
                    ...state,
                    allThirdPartyDetails: {
                        ...state.allThirdPartyDetails,
                        fetching: false,
                        error: { status: false, message: '' },
                        data:action.payload
                    }
                };
            case actionTypes.VIEW_THIRDPARTY_ERROR:
                return {
                    ...state,
                    allThirdPartyDetails: {
                        ...state.allThirdPartyDetails,
                        fetching: false,
                        error: { status: true, message: action.payload },
                        data:{}
                    }
                };

                case actionTypes.VIEW_THIRDPARTY_BY_ID:
                    return {
                        ...state,
                        thirdPartyById: {
                            ...state.thirdPartyById,
                            fetching: true,
                            error: { status: false, message: '' },
                            data: {}
                        }
                    };
                case actionTypes.VIEW_THIRDPARTY_BY_ID_SUCCESS:
                    return {
                        ...state,
                        thirdPartyById: {
                            ...state.thirdPartyById,
                            fetching: false,
                            error: { status: false, message: '' },
                            data: action.payload
                        }
                    };
                case actionTypes.VIEW_THIRDPARTY_BY_ID_ERROR:
                    return {
                        ...state,
                        thirdPartyById: {
                            ...state.thirdPartyById,
                            fetching: false,
                            error: { status: true, message: action.payload },
                            data: {}
                        }
                    };
                    case actionTypes.CLEAR_THIRDPARTY_DETAILS:
                        return {
                            ...state,
                            thirdPartyDetails: {
                                ...state.thirdPartyDetails,
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