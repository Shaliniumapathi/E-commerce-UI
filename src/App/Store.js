import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../features/products/ProductSlice";


export const store=configureStore({
    reducer:{
        products: ProductReducer,

    }


});