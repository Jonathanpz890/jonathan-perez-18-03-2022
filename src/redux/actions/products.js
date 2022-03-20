import axios from 'axios';
import * as types from '../types/products';
import { fakeProductData } from '../data/products';
import { v4 as uuidv4 } from 'uuid';
import { createMessage } from './message';

export const getProducts = () => async (dispatch) => {
    dispatch({ type: types.GET_PRODUCTS_ATTEMPT });

    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        if (response.data) {
            const { data } = response;
            fakeProductData.forEach((product, index) => {
                product.id = uuidv4();
                product.name = data[index].title;
                product.price = data[index].price;
            })
            dispatch({
                type: types.GET_PRODUCTS_SUCCESS,
                payload: {
                    data: fakeProductData
                }
            })
        }
    } catch (error) {
        dispatch({ type: types.GET_PRODUCTS_FAIL})
        dispatch(createMessage('An error occured, please try again later'))
    }
}
export const addProduct = (data) => (dispatch) => {
    console.log(data);
    dispatch({
        type: types.ADD_PRODUCT,
        payload: {
            data
        }
    })
}
export const archiveProduct = (id) => (dispatch) => {
    dispatch({
        type: types.ARCHIVE_PRODUCT,
        payload: {
            id
        }
    })
}
export const unarchiveProduct = (id) => (dispatch) => {
    dispatch({
        type: types.UNARCHIVE_PRODUCT,
        payload: {
            id
        }
    })
}