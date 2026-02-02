import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../features/products/ProductSlice";
import userReducer from '../features/user/userSlice'
import ordersReducer from '../features/user/ordersSlice'
import addressesReducer from '../features/user/addressesSlice'


export const store=configureStore({
    reducer:{
        products: ProductReducer,
        user: userReducer,
        orders: ordersReducer,
        addresses: addressesReducer,

    }


});