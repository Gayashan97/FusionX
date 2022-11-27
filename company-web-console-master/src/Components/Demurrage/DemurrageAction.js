import * as actionTypes  from './DemurrageActionTypes';
import {toast} from 'react-toastify';
import {get, post} from '../CommonComponents/Api';

export const getDemurrageCalculation = (values) => {
    return dispatch => {
        dispatch({
            type: actionTypes.GET_DEMURRAGE_CALCULATON
        });
        const url = `/DemurrageCalculation`;
        get(url, values)
            .then(res => {
                dispatch({
                    type: actionTypes.GET_DEMURRAGE_CALCULATON_SUCCESS,
                    payload: res.data,
                })
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.GET_DEMURRAGE_CALCULATON_ERROR,
                    payload: error,
                })
                toast.error(error)
            });
    };
};