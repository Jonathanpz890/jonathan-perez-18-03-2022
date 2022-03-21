import axios from 'axios';
import * as types from '../types/currencies';
import { createMessage } from './message';
import CurrencyList from 'currency-list';

export const getCurrencyList = () => async (dispatch) => {
    dispatch({ type: types.GET_CURRENCIES_ATTEMPT })
    console.log(CurrencyList.getAll('en_IL'))
    const currencyList = Object.values(CurrencyList.getAll('en_IL')).map(currency => ({label: `${currency.code} - ${currency.name}`, value: currency.code, symbol: currency.symbol}))
    dispatch({
        type: types.GET_CURRENCIES_SUCCESS,
        payload: {
            currencyList
        }
    })
}
export const setCurrency = (currency) => (dispatch) => {
    dispatch({
        type: types.SET_CURRENCY,
        payload: {
            currency
        }
    })
}
export const getCurrencyRates = () => async (dispatch) => {
    dispatch({ type: types.GET_CURRENCY_RATES_ATTEMPT })

    try {
        const response = await axios.get(`https://api.exchangeratesapi.io/v1/latest?access_key=${process.env.REACT_APP_CURRENCY_API_KEY}`)
        if (response.data) {
            dispatch({
                type: types.GET_CURRENCY_RATES_SUCCESS,
                payload: {
                    currencyRates: response.data.rates
                }
            })
        }
    } catch (error) {
        dispatch({ type: types.GET_CURRENCY_RATES_FAIL });
        dispatch(createMessage('An error has occoured, please try again later'))
        console.log(error);
    }
    setTimeout(() => {
        dispatch(getCurrencyRates())
    }, 10000)
}