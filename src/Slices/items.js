import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const Iteminfo = {
    itemsinfo:[],
    iteminfo:{},
    itemPath:''
}

const Api = process.env.REACT_APP_API_URL;



export const getitems = createAsyncThunk('items/getitems',
    async () => {
        try {
            const Data = localStorage.getItem("coods");
            const Userid = localStorage.getItem('idtity');

            if(Data){
                const coods = Data.split(',');
                const lat = coods[0];
                const lon = coods[1];
                const response = await axios.get(`${Api}/getitems`,{
                params:{
                    lat:`${lat}`,
                    lon:`${lon}`,
                    userid:`${Userid}`
                }
                });
                return response.data;
              
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export const getitem = createAsyncThunk('items/getitem',
    async () => {
        try {
            const Data = localStorage.getItem("coods");
            const Userid = localStorage.getItem('idtity');
            const itemId = localStorage.getItem('path')
            if(Data){
                const response = await axios.get(`${Api}/getitem`,{
                params:{
                    userid:`${Userid}`,
                    itemId:`${itemId}`,
                }
                });
                return response.data;
            }
        }catch (error){
            throw new Error(error.message);
        }
    }
);


const newMainSlice = createSlice({
    name: 'items',
    initialState: Iteminfo,
    reducers: {
        setitemPath:(state,action)=>{
            state.itemPath = action.payload;
        }
    },
    extraReducers: (buider)=>{
        buider
            .addCase(getitems.fulfilled,(state, action)=>{
                state.itemsinfo = action.payload;
            })
            .addCase(getitem.fulfilled,(state,action)=>{
                state.iteminfo = action.payload;
            })
    },
})

export const {setitemPath}= newMainSlice.actions;

export default newMainSlice.reducer;