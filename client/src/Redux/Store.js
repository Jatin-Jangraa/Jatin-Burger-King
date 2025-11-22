import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Redux/UserFeature.js";
import orderreducer from './OrderFeature.js'



const Store = configureStore({
    reducer:{
        user:userReducer,
        order:orderreducer,
    }
})

export default Store;

