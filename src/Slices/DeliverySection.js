import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    deliveryItems:[],
    diningItems:[],
    restAddresses:null,
}

const Api = 'http://localhost:8088'

export const setCurrentOrderItems = createAsyncThunk('delivery/setCurrentOrderItems',
    async (Data)=>{
        try {
            const jwt_token = localStorage.getItem("jwt_token");
            const response = await axios.post(`${Api}/CrtOrderitems`,{Data},{
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
export const getCurrentOrderItems = createAsyncThunk('delivery/getCurrentOrderItems',
    async ()=>{
        try {
            const userid = localStorage.getItem("idtity");
            const response = await axios.get(`${Api}/crtitems`,{
                    params:{
                        userid:`${userid}`
                    }
                })
            return response.data;

        } catch (error) {
            throw new Error(error.message);
        }
    }
)

export const restAddforDelivery = createAsyncThunk('delivery/restAddforDelivery',
    async (data) => {
        try{
            const response = await axios.post(`${Api}/restaddresses`,{
                    data
                })
            return response.data;
        }catch(err){
            throw new Error(err.message);
        }
    }
)

const deliverySlice = createSlice({
    name:"delivery",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(setCurrentOrderItems.fulfilled,(state,action)=>{
                console.log(action.payload);
            })
            .addCase(getCurrentOrderItems.fulfilled,(state,action)=>{
                state.deliveryItems = action.payload.deliveryitems;
                state.diningItems = action.payload.diningitems;
            })
            .addCase(restAddforDelivery.fulfilled,(state,action)=>{
                state.restAddresses = { orderid: action.payload.orderid, restadd: action.payload.Addresses };
            })
    }
})

export default deliverySlice.reducer;

