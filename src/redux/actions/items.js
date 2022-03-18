import axios from 'axios';
import * as types from '../types/items';
import { fakeItemData } from '../data/items';


export const getItems = () => async (dispatch) => {
    dispatch({ type: types.GET_ITEMS_ATTEMPT });

    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        if (response.data) {
            const { data } = response;
            fakeItemData.forEach((item, index) => {
                item.id = data[index].id;
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