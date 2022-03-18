import * as types from '../types/items';

const initialState = {
    loading: false,
    items: [],
}

export default function items(state = initialState, action) {
    switch (action.type) {
        case types.GET_ITEMS_ATTEMPT:
            return { ...state, loading: true }
        case types.GET_ITEMS_FAIL:
            return { ...state, loading: false }
        case types.GET_ITEMS_SUCCESS:
            return { 
                loading: false,
                items: action.payload.data
            }
        default:
            return state;
    }
}