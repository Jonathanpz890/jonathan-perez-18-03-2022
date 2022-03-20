import axios from 'axios';
import * as types from '../types/currencies';
import { createMessage } from './message';

export const getCurrencyList = () => (dispatch) => {
    dispatch({ type: types.GET_CURRENCIES_ATTEMPT })

    try {
        const response = axios.get('https://openexchangerates.org/api/currencies.json');
        console.log(response);
    } catch (error) {
        dispatch({ type: types.GET_CURRENCIES_FAIL })
        dispatch(createMessage('An error occoured, please try again later'));
    }
}