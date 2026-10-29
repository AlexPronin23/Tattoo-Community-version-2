import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const createOrder = createAsyncThunk(
    'order/createOrder',
    async function ({master_id,customerName,customerPhone,dateOrder,timeOrder,price,message}, {rejectWithValue}) {
        try {

            const response = await fetch('/api/orders/create', {
                method:'POST',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    master_id:master_id,
                    customerName:customerName,
                    customerPhone:customerPhone,
                    dateOrder:dateOrder,
                    timeOrder,
                    price:price,
                    message:message
                })
            })

            const data = await response.json()

            if(!response.ok) {
                return rejectWithValue({message:data.message})
            }

            return ({
                message:data.message,
                order: data.order
            })
            
        } catch (error) {
            return rejectWithValue({message:error.message})
        }
        
    }
)

export const getOrderCount = createAsyncThunk(
    'orders/getOrderCount',
    async function (_,{rejectWithValue}) {
        try {
            
            const response = await fetch('/api/orders-count', {
                credentials:'include'
            })

            const data = await response.json()

            return ({
                orderCount:data.orderCount
            })

        } catch (error) {
            return rejectWithValue({message:error.message})
        }
        
    }
)

export const getMasterOrders = createAsyncThunk(
    'order/getMasterOrders',
    async function (_,{rejectWithValue}) {
        try {

            const response = await fetch('/api/master-orders', {
                credentials:'include'
            })

            const data = await response.json()

            return ({
                masterOrders:data.masterOrders
            })           
        } catch (error) {
            return rejectWithValue({message:error.message})
        }
        
    }
)

const orderSlice = createSlice({
    name:'order',
    initialState:{
        masterOrders:[],
        status:null,
        error:null,
        orderCount:0,
        created:false,
        message:'',
    },
    extraReducers:(builder) => {
        builder
        .addCase(createOrder.fulfilled, (state,action) => {
            state.status = 'Успешно'
            state.message = action.payload.message
            state.created = true
        })
        .addCase(createOrder.rejected, (state,action) => {
            state.status = 'Отклонен'
            state.error = action.payload
            state.message = action.payload.message
            state.created = false
        })
        .addCase(getOrderCount.fulfilled,(state,action) => {
            state.status = 'Успешно'
            state.orderCount = action.payload.orderCount
        })
        .addCase(getOrderCount.rejected,(state,action) => {
            state.status = 'Отклонен'
            state.error = action.payload
        })
        .addCase(getMasterOrders.pending, (state,action) => {
            state.status = 'Загрузка'
            state.error = null
        })
        .addCase(getMasterOrders.fulfilled,(state,action) => {
            state.status = 'Успешно'
            state.masterOrders = action.payload.masterOrders
        })
        .addCase(getMasterOrders.rejected,(state,action) => {
            state.status = 'Отклонен'
            state.error = action.payload.error
        })
        
    }
})

export default  orderSlice.reducer