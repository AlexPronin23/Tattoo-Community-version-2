import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


export const getStyles = createAsyncThunk(
    'style/getStyles',
    async function (_,{rejectWithValue}) {
        try {

            const response = await fetch('/api/styles')

            const data = await response.json()

            if(!response.ok){
                return rejectWithValue(data.message)
            }

            return data.styles
            
        } catch (error) {
            return rejectWithValue(error.message)
        }
        
    }
)

const styleSlice = createSlice({
    name:'style',
    initialState:{
        styles:[],
        error:null
    },
    extraReducers:(builder) => {
        builder
        .addCase(getStyles.fulfilled, (state,action) => {
            state.styles = action.payload
        })
        .addCase(getStyles.rejected, (state,action) => {
            state.error = action.payload
        })
    }
})

export default styleSlice.reducer