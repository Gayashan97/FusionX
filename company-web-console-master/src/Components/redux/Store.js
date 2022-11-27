import {combineReducers, createStore,applyMiddleware} from 'redux';
import {authReducer} from '../Auth/AuthReducer';
import {activityReducer} from '../ActivityList/ActivityReducer';
import {employeeReducer} from '../Employee/EmployeeReducer';
import {wareHouseReducer} from '../WareHouse/WareHouseReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const Store = ()=> {
    const store = createStore (
        combineReducers({
            auth:authReducer,
            activity:activityReducer,
            employee:employeeReducer,
            wareHouse:wareHouseReducer,
        }),
        applyMiddleware(thunk, logger)
    )
    return store;
}