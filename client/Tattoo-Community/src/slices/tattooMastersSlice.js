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

// Создание анкеты

export const createWorkSheet = createAsyncThunk(
    'tattooMasters/createWorkSheet',
    async function ({masterInfo}, {_,rejectWithValue}) {
        try {
            const response = await fetch('/api/tattoomasters/profile', {
                method:'POST',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(masterInfo)
            })

            const data = await response.json()

            if(!response.ok) {
               return rejectWithValue(data.message)
            }

            return {
                message:data.message,
                master:data.master
            }

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
        error:null,
        created:false,
        currentMaster:null
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
        .addCase(createWorkSheet.pending,(state,action) => {
            state.status = 'Загрузка'
            state.error = null
        })
        .addCase(createWorkSheet.fulfilled, (state,action) => {
            state.status = 'Успешно'
            state.currentMaster = action.payload.master
            state.created = true
        })
        .addCase(createWorkSheet.rejected,(state,action) => {
            state.status = 'Отклонен'
            state.error = action.payload.message
        })

    }
})

export default  tattooMastersSlice.reducer

