import * as types from '../types/darkMode';

const initialState = {
    darkMode: false
}

export default function darkMode(state = initialState, action) {
    switch (action.type) {
        case types.TOGGLE_DARK_MODE:
            return { darkMode: !state.darkMode }
        default:
            return state;
    }
}