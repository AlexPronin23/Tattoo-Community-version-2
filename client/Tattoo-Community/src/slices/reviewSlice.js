import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

// Создание отзыва
export const createReviews = createAsyncThunk(
    'review/createReviews',
    async function ({master_id,message,rate,dateReview,timeReview}, {rejectWithValue}) {
        try {

            const response = await fetch('/api/create-review', {
                method:'POST',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    master_id:master_id,
                    message:message,
                    rate:rate,
                    dateReview:dateReview,
                    timeReview:timeReview
                })
            })

            const data = await response.json()

            return ({
                message:data.message
            })
            
        } catch (error) {
            return rejectWithValue({message:error.message})
        }
        
    }
)

// Получение отзывов мастера
export const getMasterReviews = createAsyncThunk(
    'review/getMasterReviews',
    async function ({id}, {rejectWithValue}) {
        try {

            const response = await fetch(`/api/master-reviews/${id}`)

            const data = await response.json()

            return ({
                reviews:data.reviews
            })
            
        } catch (error) {
            return rejectWithValue({message:error.message})
        }
        
    }
)

// Получить средний рейтинг мастера
export const getAverageMasterRate = createAsyncThunk(
    'review/getAverageMasterRate',
    async function (user_id, {rejectWithValue}) {
        try {
            
            const response = await fetch(`/api/master-average-rate/?user_id=${user_id}`)

            const data = await response.json()

            return ({
                message:data.message,
                averageRate:data.averageRate
            })

        } catch (error) {
            return rejectWithValue({message:error.message})
        }
        
    }
)


const reviewSlice = createSlice({
    name:'review',
    initialState:{
        reviews:[],
        status:null,
        error:null,
        reviewsType:'',
        averageRates:{}
    },
 
    extraReducers:(builder) => {
        builder
        .addCase(createReviews.fulfilled, (state,action) => {
            state.status = 'Успешно'
        })
        .addCase(createReviews.rejected, (state,action) => {
            state.status = 'Отклонен'
            state.error = action.payload
        } )
        .addCase(getMasterReviews.pending, (state,action) => {
            state.status = 'Загрузка'
            state.error = null
        })
        .addCase(getMasterReviews.fulfilled, (state,action) => {
            state.status = 'Успешно'
            state.reviews = action.payload.reviews
        })
        .addCase(getMasterReviews.rejected, (state,action) => {
            state.status = 'Отклонен'
            state.error = action.payload
        })
        .addCase(getAverageMasterRate.fulfilled, (state,action) => {
            state.status = 'Успешно'
            state.averageRates[action.meta.arg] = action.payload.averageRate
        })
        .addCase(getAverageMasterRate.rejected, (state,action) => {
            state.status = 'Отклонен'
            state.error = action.payload
        })
        
        
    }
})

export const {checkReviewsType} = reviewSlice.actions
export default reviewSlice.reducer