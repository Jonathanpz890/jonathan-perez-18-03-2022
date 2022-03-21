import { combineReducers } from "redux";
import products from './products';
import message from './message';
import currencies from './currencies';
import darkMode from './darkMode';


const rootReducer = combineReducers({
    products,
    message,
    currencies,
    darkMode
})

export default rootReducer;