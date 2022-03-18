import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import {composeWithDevTools} from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'Storage',
    storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState = {};

let middleware = [thunk];


let compose =
  process.env.REACT_APP_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(...middleware))
    : applyMiddleware(...middleware);

const store = createStore(persistedReducer, initialState, compose);
export const persistor = persistStore(store);

export default store;