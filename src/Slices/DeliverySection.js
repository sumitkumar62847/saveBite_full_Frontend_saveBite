import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    ordersItems:[],
    allOrderItems:[],
    orderNumber:0
}


const Api = process.env.REACT_APP_API_URL;


export const setCurrentOrderItems = createAsyncThunk('delivery/setCurrentOrderItems',
    async (Data)=>{
        try {
            const jwt_token = localStorage.getItem("jwt_token");
            console.log(Data)
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
                console.log("hbxjbhvgcf",response.data);
            return response.data;

        } catch (error) {
            throw new Error(error.message);
        }
    }
)



export const getOrderItems = createAsyncThunk('delivery/getOrderItems',
    async ()=>{
        try {
            const userid = localStorage.getItem("idtity");
            const response = await axios.get(`${Api}/ordereditems`,{
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

export const getOrderNumber = createAsyncThunk('delivery/getOrderNumber',
    async ()=>{
        try {
            const userid = localStorage.getItem("idtity");
            const response = await axios.get(`${Api}/orderedNbr`,{
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
                state.ordersItems = action.payload.ordersItems;
               
            })
            .addCase(getOrderItems.fulfilled,(state,action)=>{
                state.allOrderItems = action.payload.allOrderItems;
               
            })
            .addCase(getOrderNumber.fulfilled,(state,action)=>{
                state.orderNumber = action.payload.number;
            })
            
    }
})

export default deliverySlice.reducer;

