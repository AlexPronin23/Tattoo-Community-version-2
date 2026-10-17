import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const LIMIT = 3

export const getMastersLimit = createAsyncThunk(
    'pagination/getMastersLimit',
    async function ({page,limit}, {rejectWithValue}) {
        try {

            const response = await fetch(`/api/tattoomasters?page=${page}&limit=${limit}`, {
                credentials:'include'
            })

            const data = await response.json()

            if(!response.ok) {
                return rejectWithValue('Ошибка')
            }

            return ({
                mastersLimit:data.mastersLimit,
                pagination:data.pagination
            })
            
        } catch (error) {
            return rejectWithValue({message:error.message})
        }
        
    }
)

const paginationSlice = createSlice({
    name:'pagination',
    initialState:{
        mastersLimit:[],
        page:1,
        totalPages:1,
        limit:LIMIT,
        total:0,
        error:null,
        status:null
    },
    reducers: {
        setPage: (state,action) => {
            state.page = action.payload
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(getMastersLimit.pending, (state,action) => {
            state.status = 'Загрузка',
            state.error = null
        })
        .addCase(getMastersLimit.fulfilled, (state,action) => {
            state.status = 'Успешно'
            state.mastersLimit = action.payload.mastersLimit
            state.page = action.payload.pagination.page
            state.totalPages = action.payload.pagination.totalPages
            state.total = action.payload.pagination.total
        })
        .addCase(getMastersLimit.rejected, (state,action) => {
            state.status = 'Отклонен'
            state.error = action.payload
        })
    }
})


export default paginationSlice.reducer
export const {setPage} = paginationSlice.actions