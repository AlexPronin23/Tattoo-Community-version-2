import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
    name:'popup',
    initialState:{
        open:false,
        message:'',
        type:'success'
    },
    reducers:{
        showPopup: (state,action) => {
            state.open = true
            state.message = action.payload.message || ""
            state.type = action.payload.type || 'error'
        },
        hidePopup:(state,action) => {
            state.open = false,
            state.message = ''
        }
    }
})


export const {showPopup,hidePopup} = popupSlice.actions

export default popupSlice.reducer