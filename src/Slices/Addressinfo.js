import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const newadd = {
    restAdd:null,
    isAddress: false,
}


const Api = 'https://savebite-full-version-server.onrender.com';


export const getAddressData = createAsyncThunk('restAdd/getAddressData',
    async () => {
        try {
            const userData = localStorage.getItem("idtity")
            const response = await axios.get(`${Api}/getuseradd`,{
                params:{
                    userid:`${userData}`,
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export const deleteUserAdd = createAsyncThunk('restAdd/deleteUserAdd',
    async (id) =>{
        try{
            const response = await axios.delete(`${Api}/deleteAdd`,{
                params:{
                    id:`${id}`
                }
            });
            return response.data;
        }catch(err){
            throw new Error(err.message);
        }
    }
)


export const createAddress = createAsyncThunk('restAdd/createAddress',
    async (addressData) => {
        try {
            console.log(addressData);
            const jwt_token = localStorage.getItem("jwt_token");
            const response = await axios.post(`${Api}/useraddset`,addressData,{
                headers: {
                    'Authorization': `Bearer ${jwt_token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        }catch (error) {
            throw new Error(error.message);
        }
    }
)

export const setCurrentAdd = createAsyncThunk('restAdd/setCurrentAdd',
    async (data) =>{
        try{
            const response = await axios.post(`${Api}/setAdd`,data);
            return response.data;
        }catch(err){
            throw new Error(err.message);
        }
    }
)


const restRegister = createSlice({
    name:'restAdd',
    initialState: newadd,
    reducers: {
        setCurrentAddAtF: (state, action) => {
            console.log('cdscvdsc');
            state.restAdd?.AddData?.forEach((ele) => {
                if (ele._id !== action.payload) {
                    ele.isUseNow = false;
                }
                if (ele._id === action.payload) {
                    ele.isUseNow = true;
                }
                console.log(ele._id, action.payload);
            });
            
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(getAddressData.fulfilled,(state, action)=>{
                state.restAdd = action.payload;
            })
            .addCase(createAddress.fulfilled, (state)=>{
                state.isAddress = true;
            })
            .addCase(deleteUserAdd.fulfilled,(state,action)=>{
                state.restAdd = state.restAdd?.AddData?.filter(add => add._id !== action.payload?.id)
            })
    }
});

export const {setCurrentAddAtF} = restRegister.actions;

export default restRegister.reducer;

     