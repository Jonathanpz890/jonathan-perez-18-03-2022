import * as types from '../types/darkMode';

export const toggleDarkMode = () => (dispatch) => {
    dispatch({ type: types.TOGGLE_DARK_MODE })
}