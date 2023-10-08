import { createSlice } from "@reduxjs/toolkit";
//import Cookies from "js-cookie";

const initialState = {
  blogHeader:null,
  blogDetail:null,
  searchTerm:'',
};

export const dreamSlice = createSlice({
  name: "dreamSlice",
  initialState,
  reducers: {
    addBlogHeader:(state,{payload})=>{
        state.blogHeader=payload;
    },
    addBlogDetail:(state,{payload})=>{
        state.blogDetail=payload;
    },
    setSearchTerm:(state,{payload})=>{
        state.searchTerm=payload;
    }
  },
});

export const {addBlogHeader,addBlogDetail,setSearchTerm} = dreamSlice.actions;
export default dreamSlice.reducer;