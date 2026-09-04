import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

// Получение всех тату мастеров
export const getAllTattooMasters = createAsyncThunk(
    'tattooMasters/getAllTattooMasters',
    async function (_,{rejectWithValue}) {

        try {

            const response = await fetch('/api/tattoomasters')

            if(!response.ok) {
                let message = `Произошла ошибка: ${response.status} ${response.statusText}`
                throw new Error(message)
            }

            const data = await response.json()

            return data.masters
            
        } catch (error) {
            return rejectWithValue(error.message)
        }
        
    }
)

 export const tattooMastersSlice = createSlice({
    name:'tattooMasters',
    initialState: {
        tattooMasters: [],
        status: null,
        error:null
    },
    extraReducers:(builder) => {
        builder
        .addCase(getAllTattooMasters.pending, (state,action) => {
            state.status = 'Загрузка'
            state.error = null
        })
        .addCase(getAllTattooMasters.fulfilled, (state,action) => {
            state.status = 'Успешно'
            state.tattooMasters = action.payload
        })
        .addCase(getAllTattooMasters.rejected, (state,action) => {
            state.status = 'Отклонен'
            state.error = action.payload
        })

    }
})

export default  tattooMastersSlice.reducer

