import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

// Получение всех услуг
export const getServices = createAsyncThunk(
    'service/getServices',
    async function (_,{rejectWithValue}) {
        try {

            const response = await fetch('/api/services')

            const data = await response.json()
            
            if(!response.ok) {
                return rejectWithValue({message:data.message})
            }

            return ({
                message:data.message,
                services:data.services
            })

        } catch (error) {
            return rejectWithValue({message:error.message})
        }
        
    }
)

// Создание услуг + цена
export const createServices = createAsyncThunk(
    'service/createServices',
    async function ({service_id, servicePrice}, {rejectWithValue}) {
        try {
            
            const response = await fetch('/api/create-services', {
                method:'POST',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    service_id:service_id,
                    servicePrice:servicePrice
                })
            })

            const data = await response.json()

            if(!response.ok) {
                return rejectWithValue({message:data.message})
            }

            return data

        } catch (error) {
            return rejectWithValue({message:error.message})
        }
        
    }
)

// Получение всех услуг конкретного мастера
export const getMasterServices = createAsyncThunk(
    'service/getMasterServices',
    async function (_,{rejectWithValue}) {
        try {

            const response = await fetch('/api/master-services',{
                credentials:'include'
            })

            const data = await response.json()

            return ({
                masterServices:data.masterServices
            })
            
        } catch (error) {
            return rejectWithValue({message:error.message})
        }
        
    }
)

// Получение услуг конкретного мастера
export const getCurrentMasterServices = createAsyncThunk(
    'service/getCurrentMasterServices',
    async function ({id}, {rejectWithValue}) {
        try {
            
            const response = await fetch(`/api/master-services/${id}`)

            const data = await response.json()

            if(!response){
                return rejectWithValue({message:data.message})
            }

            return ({
                currentMasterServices:data.currentMasterServices
            })

        } catch (error) {
            return rejectWithValue({message:error.message})
        }
        
    }
)

const serviceSlice = createSlice({
    name:'service',
    initialState:{
        services:[],
        masterServices:[],
        currentMasterServices:[],
        status:null,
        error:null,
    },
    extraReducers:(builder) => {
        builder
        .addCase(getServices.pending, (state,action) => {
            state.status = 'Загрузка'
            state.error = null
        })
        .addCase(getServices.fulfilled,(state,action) => {
            state.status = 'Успешно',
            state.services = action.payload.services
        })
        .addCase(getServices.rejected,(state,action) => {
            state.status = 'Отклонен',
            state.error = action.payload
        })
        .addCase(createServices.fulfilled,(state,action) => {
            state.status = 'Успешно'
        })
        .addCase(createServices.rejected,(state,action) => {
            state.status = 'Отклонен'
            state.error = action.payload
        })
        .addCase(getMasterServices.fulfilled,(state,action) => {
            state.status = 'Успешно'
            state.masterServices = action.payload.masterServices
        })
        .addCase(getMasterServices.rejected,(state,action) => {
            state.status = 'Отклонен'
            state.error = action.payload
        })
        .addCase(getCurrentMasterServices.fulfilled,(state,action) => {
            state.status = 'Успешно'
            state.currentMasterServices = action.payload.currentMasterServices
        })
        .addCase(getCurrentMasterServices.rejected,(state,action) => {
            state.status = 'Отклонен'
            state.error = action.payload
        })
    }
})

export default serviceSlice.reducer