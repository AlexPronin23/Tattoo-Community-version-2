import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
    name:'review',
    initialState:{
        reviews:[]
    }
})

export default reviewSlice.reducer