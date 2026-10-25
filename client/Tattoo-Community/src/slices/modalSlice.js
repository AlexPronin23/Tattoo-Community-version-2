import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name:'modal',
    initialState:{
        open:false
    },
    reducers: {
        setOpen : (state) => {
            state.open = true
        },
        setClose : (state) => {
            state.open = false
        }
    }
})

export const {setOpen,setClose} = modalSlice.actions
export default modalSlice.reducer