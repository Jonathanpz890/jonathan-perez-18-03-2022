import * as types from '../types/message';

export const createMessage = (message) => (dispatch) => {
    dispatch({
        type: types.CREATE_MESSAGE,
        payload: {
            message
        }
    })
}

export const removeMessage = () => (dispatch) => {
    dispatch({
        type: types.REMOVE_MESSAGE
    })
}