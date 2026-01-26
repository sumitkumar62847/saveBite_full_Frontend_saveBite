import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const NewUser = {
    userinfo:{},
    userid: "",
    isRegistered: false,
}

const Api = process.env.REACT_APP_API_URL;
// const Api = 'http://localhost:8088';



export const getUser = createAsyncThunk('mainSB/getUser',
    async ()=>{
        try {
            const jwt_token = localStorage.getItem('jwt_token');
            const response = await axios.get(`${Api}/userInfo`,{
                headers:{
                    'Authorization': 'Bearer '+jwt_token,
                    'Content-Type':'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export const createUser = createAsyncThunk('mainSB/createUser',
    async (userData) => {
        try {
            const response = await axios.post(`${Api}/mainLogin`, userData);
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
)
export const createProfile = createAsyncThunk('mainSB/createprofile',
    async (profileData) =>{
        try{
            const response = await axios.post(`${Api}/createprofile`,profileData);
            return response.data;
        }catch(err){
            throw new Error(err.message);
        }
    }
)

export const mainLogin = createAsyncThunk('mainSB/login',
    async (jwt_token) => {
        try {
            const response = await axios.post(`${Api}/login`,null,{
                headers: {
                    'Authorization': 'Bearer '+jwt_token,
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response.data;

        }catch(err){
            throw new Error(err.message);
        }
    }
)

export const otpVerification = createAsyncThunk('mainSB/otpVerification',
    async (otpData) => {
        try {
            const response = await axios.post(`${Api}/otpverify`, otpData);
            // console.log(response.data);
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
)


const newMainSlice = createSlice({
    name: 'mainSB',
    initialState: NewUser,
    reducers: {
        loginUiHandle:(state)=>{
            state.isRegistered = false;
        },
    },
    extraReducers: (buider)=>{
        buider
            .addCase(getUser.fulfilled,(state, action)=>{
                state.userinfo = action.payload;
            })
            .addCase(createUser.fulfilled, (state,action)=>{
                localStorage.setItem('idtity', action.payload.userid);
                state.userid = action.payload.userid;
            })
            .addCase(otpVerification.fulfilled, (state,action)=>{
                console.log(action.payload.stage);
                localStorage.setItem('jwt_token', action.payload.token);
                state.isRegistered = true;
            })
            .addCase(mainLogin.fulfilled, (state,action)=>{
                state.isRegistered = true;
            })
            .addCase(createProfile.fulfilled,()=>{
                localStorage.setItem('pfystatus',true);
            })
    },
})

export const {loginUiHandle} = newMainSlice.actions;

export default newMainSlice.reducer;