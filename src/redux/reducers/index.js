import { combineReducers } from "redux";
import products from './products';
import message from './message';
import currencies from './currencies';


const rootReducer = combineReducers({
    products,
    message,
    currencies
})

export default rootReducer;