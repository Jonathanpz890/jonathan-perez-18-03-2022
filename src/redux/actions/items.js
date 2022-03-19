import axios from 'axios';
import * as types from '../types/items';
import { fakeItemData } from '../data/items';
import { v4 as uuidv4 } from 'uuid';

export const getItems = () => async (dispatch) => {
    dispatch({ type: types.GET_ITEMS_ATTEMPT });

    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        if (response.data) {
            const { data } = response;
            fakeItemData.forEach((item, index) => {
                item.id = uuidv4();
                item.name = data[index].title;
                item.price = data[index].price;
            })
            dispatch({
                type: types.GET_ITEMS_SUCCESS,
                payload: {
                    data: fakeItemData
                }
            })
        }
    } catch (error) {
        dispatch({ type: types.GET_ITEMS_FAIL})
        console.log(error);
    }
}
export const addItem = (data) => (dispatch) => {
    console.log(data);
    dispatch({
        type: types.ADD_ITEM,
        payload: {
            data
        }
    })
}
export const archiveItem = (id) => (dispatch) => {
    dispatch({
        type: types.ARCHIVE_ITEM,
        payload: {
            id
        }
    })
}
export const unarchiveItem = (id) => (dispatch) => {
    dispatch({
        type: types.UNARCHIVE_ITEM,
        payload: {
            id
        }
    })
}