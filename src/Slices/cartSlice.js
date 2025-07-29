import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cartItems:[],
    HomeItemAmt:[],
    RestItemAmt:[],
    dlyCrg : 49,
}


const Api = 'http://localhost:8088'

export const getCartItems = createAsyncThunk('cart/getCartItems',
    async () => {
        try {
            const jwt_token = localStorage.getItem("jwt_token");
            const response = await axios.get(`${Api}/getCartItems`,{
                headers: {
                    'Authorization': 'Bearer '+jwt_token,
                    'Content-Type': 'application/json'
                }
            })
            return response.data;

        } catch (error) {
            throw new Error(error.message);
        }
    }
)

export const addToCart = createAsyncThunk('cart/addToCart',
    async (itemData)=>{
        try {
            const jwt_token = localStorage.getItem("jwt_token");
            const response = await axios.post(`${Api}/addToCart`,{itemData},{
                    headers: {
                        'Authorization': `Bearer ${jwt_token}`,
                        'Content-Type': 'application/json',
                    }
                })
            return response.data;

        } catch (error) {
            throw new Error(error.message);
        }
    }
)

export const DeleteToCart = createAsyncThunk('cart/DeleteToCart',
    async (itemId)=>{
        try {
            const userId = localStorage.getItem('idtity');
            const response = await axios.delete(`${Api}/CartItemDelete`,{
                 params:{
                    id:`${itemId}`,
                    userId:`${userId}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
)

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        pushInHome: (state, action) => {
            const exists = state.HomeItemAmt.some(item => item._id === action.payload._id);
            if (!exists) {
                state.HomeItemAmt.push(action.payload);
            }
            state.RestItemAmt = state.RestItemAmt?.filter(item => item._id !== action.payload._id);

        },
        pushInRest:(state,action)=>{
            const exists = state.RestItemAmt.some(item => item._id === action.payload._id);
            if (!exists) {
                state.RestItemAmt.push(action.payload);
                const newState = state.HomeItemAmt?.filter(item => item._id !== action.payload._id);
                state.HomeItemAmt  = newState;
            }
        },
        popByRest:(state,action)=>{
            const exists = state.HomeItemAmt.some(item => item._id === action.payload._id);
            if (!exists) {
                state.HomeItemAmt.push(action.payload);
            }
            state.RestItemAmt = state.RestItemAmt?.filter(item => item._id !== action.payload._id);
        },
        incQuantity:(state,action)=>{
            state.HomeItemAmt = state.HomeItemAmt?.map((item) => {
                if(item._id === action.payload._id){
                    return {...item, userQty:item.userQty + 1}
                }
                return item
            });
             state.RestItemAmt = state.RestItemAmt?.map((item) => {
                if(item._id === action.payload._id){
                    return {...item, userQty:item.userQty + 1}
                }
                return item
             });

        },
        decQuantity:(state, action)=>{
            state.HomeItemAmt = state.HomeItemAmt?.map((item) => {
                if(item._id === action.payload._id){
                    return {...item, userQty:item.userQty - 1}
                }
                return item
            });
            state.RestItemAmt = state.RestItemAmt?.map((item) => {
                if(item._id === action.payload._id){
                    return {...item, userQty:item.userQty - 1}
                }
                return item
             });

        },
        setdlyCrg:(state,action)=>{
            state.dlyCrg = action.payload;
        },
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getCartItems.fulfilled,(state,action)=>{
                state.cartItems = action.payload?.cart
            })
            .addCase(addToCart.fulfilled,(state,action)=>{
                state.cartItems = action.payload?.cart
            })
            .addCase(DeleteToCart.fulfilled,(state,action)=>{
                state.cartItems = state.cartItems?.filter(item => item._id !== action.payload?.itemId);
                state.HomeItemAmt = state.HomeItemAmt?.filter(item => item._id !== action.payload?.itemId);
                state.RestItemAmt = state.RestItemAmt?.filter(item => item._id !== action.payload?.itemId);
            })
    }
})

export const {setdlyCrg,pushInHome,pushInRest,popByRest,incQuantity,decQuantity} = cartSlice.actions;

export default cartSlice.reducer;