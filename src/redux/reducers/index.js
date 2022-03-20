import { combineReducers } from "redux";
import products from './products';
import message from './message';


const rootReducer = combineReducers({
    products,
    message
})

export default rootReducer;