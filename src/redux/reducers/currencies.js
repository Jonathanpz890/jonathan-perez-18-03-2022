import * as types from '../types/currencies';

const initialState = {
    loading: false,
    currencyList: [],
    currency: '',
    currencyRates: [],
}

export default function currencies(state = initialState, action) {
    switch(action.type) {
        case types.GET_CURRENCIES_ATTEMPT:
            return { ...state, loading: true }
        case types.GET_CURRENCIES_FAIL:
            return { ...state, loading: false }
        case types.GET_CURRENCIES_SUCCESS:
            return { 
                ...state,
                loading: false,
                currencyList: action.payload.currencyList
            }
        case types.GET_CURRENCY_RATES_ATTEMPT:
            return { ...state, loading: true }
        case types.GET_CURRENCY_RATES_FAIL:
            return { ...state, loading: false }
        case types.GET_CURRENCY_RATES_SUCCESS:
            return { 
                ...state,
                loading: false,
                currencyRates: action.payload.currencyRates
            }
        case types.SET_CURRENCY:
            return {
                ...state,
                currency: action.payload.currency
            }
        default:
            return state;
    }
}