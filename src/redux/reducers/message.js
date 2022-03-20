import * as types from '../types/message';

const initialState = {
    message: '',
}

export default function message(state = initialState, action) {
    switch(action.type) {
        case types.CREATE_MESSAGE:
            return { message: action.payload.message }
        case types.REMOVE_MESSAGE:
            return { message: '' }
        default:
            return state;
    }
}