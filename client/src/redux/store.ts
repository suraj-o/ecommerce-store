import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/user";
import { productApi } from "./api/products";

import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { userApi } from "./api/user";
import { cartReducer } from "./reducer/addtoCart";

const persistConfig={
    key:"root",
    version:1,
    storage
}

const reducers=combineReducers({
    [userReducer.name]:userReducer.reducer,
    [productApi.reducerPath]:productApi.reducer,
    [userApi.reducerPath]:userApi.reducer,
    [cartReducer.name]:cartReducer.reducer
})

const persistedReducer=persistReducer(persistConfig,reducers)

const store = configureStore({
    reducer:persistedReducer,
    middleware:(mid)=>mid().concat(productApi.middleware,userApi.middleware)
});

export default store;