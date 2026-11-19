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

const reviewSlice = createSlice({
    name:'review',
    initialState:{
        reviews:[],
        status:null,
        error:null
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
        
    }
})

export default reviewSlice.reducer