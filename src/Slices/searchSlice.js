import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  navigatePath: "",
  searchData: null,
  isLoader:false,
};

const Api = "https://savebite-full-version-server.onrender.com";
// const Api = 'http://localhost:8088'

export const getSearchitems = createAsyncThunk(
  "search/getSitems",
  async (searchdata) => {
    try {
      const Data = localStorage.getItem("coods");
      const userid = localStorage.getItem('idtity');
      if (Data) {
        const coods = Data.split(",");
        const lat = coods[0];
        const lon = coods[1];
        const datas = { searchdata, lat, lon,userid};
        const response = await axios.post(`${Api}/getSitems`, datas);
        return response.data;
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setPath: (state, action) => {
      state.navigatePath = action.payload;
    },
  },
  extraReducers: (buider) => {
    buider
      .addCase(getSearchitems.pending, (state)=>{
          state.isLoader = true;
      })
      .addCase(getSearchitems.fulfilled, (state, action) => {
        state.isLoader = false;
        state.searchData = action.payload;
        console.log(action.payload);
      });
  },
});

export const { setPath } = searchSlice.actions;

export default searchSlice.reducer;
