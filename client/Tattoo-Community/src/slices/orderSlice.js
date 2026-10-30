import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

// Создание заказа
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

// Получение количество заказов мастера
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

// Получение заказов мастера
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

// Получение количество заказов клиента
export const getBookingsCount = createAsyncThunk(
    'order/getBookingsCount',
    async function (_,{rejectWithValue}) {

        try {

            const response = await fetch('/api/bookings-count', {
                credentials:'include'
            })

            const data = await response.json()

            return ({
                bookingsCount:data.bookingsCount
            })
            
        } catch (error) {
            return rejectWithValue({message:error.message})
        }
        
    }
)

// Получение заказов клиента
export const getClientOrders = createAsyncThunk(
    'order/getClientOrders',
    async function (_,{rejectWithValue}) {
        try {

            const response = await fetch('/api/client-orders', {
                credentials:'include'
            })

            const data = await response.json()

            return ({
                clientOrders:data.clientOrders
            })
            
        } catch (error) {
            return rejectWithValue({message:error.message})
        }
        
    }
)

export const updateStatusOrder = createAsyncThunk(
    'order/updateStatusOrder',
    async function ({order_id,status}, {rejectWithValue}) {
        try {

            const response = await fetch('/api/update-order-status',{
                method:'PUT',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    order_id:order_id,
                    status:status
                })
            })
            
            const data = await response.json()

            if(!response.ok){
                return rejectWithValue({message:data.message})
            }

            return ({
                message:data.message,
                updatedStatus:data.updatedStatus
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
        clientOrders:[],
        status:null,
        error:null,
        orderCount:0,
        bookingsCount:0,
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
        .addCase(getBookingsCount.fulfilled, (state,action) => {
            state.status = 'Успешно'
            state.bookingsCount = action.payload.bookingsCount
        })
         .addCase(getBookingsCount.rejected, (state,action) => {
            state.status = 'Отклонен'
            state.bookingsCount = action.payload
        })
        .addCase(getClientOrders.fulfilled,(state,action) => {
            state.status = 'Успешно'
            state.clientOrders = action.payload.clientOrders
        })
        .addCase(getClientOrders.rejected,(state,action) => {
            state.status = 'Отклонен'
            state.clientOrders = action.payload
        })
        .addCase(updateStatusOrder.fulfilled,(state,action) => {
            state.status = 'Успешно'
            state.masterOrders = state.masterOrders.map(order => 
            order.order_id === action.meta.arg.order_id 
            ? { ...order, status: "Выполнен" } 
            : order
    );
    
        if (state.orderCount > 0) {
         state.orderCount -= 1;
    }
        })
        .addCase(updateStatusOrder.rejected,(state,action) => {
            state.status = 'Отклонен'
            state.statusOrder = action.payload.message
        })
        
        
        
    }
})

export default  orderSlice.reducer
export const {minusCountOrder} = orderSlice.actions