import { configureStore } from "@reduxjs/toolkit";
import mainSBReducer from '../Slices/Register.js';
import restAddress from '../Slices/Addressinfo.js';
import itemsinfo from '../Slices/items.js';
import searchReducer from '../Slices/searchSlice.js'
import cartReducer from '../Slices/cartSlice.js'
import deliveryReducer from '../Slices/DeliverySection.js'

const store = configureStore({
    reducer: {
        mainSB: mainSBReducer,
        restAdd:restAddress,
        items:itemsinfo,
        search:searchReducer,
        cart:cartReducer,
        delivery:deliveryReducer,
    },
})
export default store;