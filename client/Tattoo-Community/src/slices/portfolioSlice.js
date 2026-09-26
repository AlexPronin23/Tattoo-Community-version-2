import { createSlice,createAsyncThunk, current } from "@reduxjs/toolkit";

// Получение портфолио
export const getPortfolio = createAsyncThunk(
    'portfolio/getPortfolio',
    async function (_,{rejectWithValue}) {
        try {
            
            const response = await fetch('/api/portfolio', {credentials:'include'})

            const data = await response.json()

            if(!response.ok) {
                return rejectWithValue(data.message)
            }

            return data.photos

        } catch (error) {
            return rejectWithValue(error.message)
        }
        
    }
)

// Добавление портфолио
export const addPortfolio = createAsyncThunk(
    'portfolio/addPortfolio', 
    async function ({images}, {rejectWithValue}) {
        try {
            const response = await fetch('/api/portfolio', {
                method:'POST',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({images})
            })

            const data = await response.json()

            if(!response.ok) {
                return rejectWithValue({message:data.message})
            }

          return data.photos
            
        } catch (error) {
            return rejectWithValue(error.message)
        }
        
    }
)

// Получение портфолио конкретного пользователя

export const getOnePortfolio = createAsyncThunk(
    'portfolio/getOnePortfolio',
    async function ({id}, {rejectWithValue}) {
        try {
            const response = await fetch(`/api/portfolio/${id}`,{
                credentials:'include'
            })

            const data  = await response.json()

            if(!response.ok){
                return rejectWithValue({message:data.message})
            }

            return data.photos
            
        } catch (error) {
            return rejectWithValue(error.message)
        }
        
    }
)


const portfolioSlice = createSlice({
    name:'portfolio',
    initialState:{
        photos:[],
        uploaded:false,
        error:null,
        currentPortfolio:[]
    },
    reducers: {
        resetPortfolio:(state) => {
            state.photos = []
            state.uploaded = false
            state.error = null
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(getPortfolio.fulfilled, (state, action) => {
            state.photos = action.payload;
            state.uploaded = action.payload.length > 0;   
            })
        .addCase(addPortfolio.fulfilled, (state, action) => {
            state.photos = action.payload.photos;
            state.uploaded = true;
            })
        .addCase(addPortfolio.rejected,(state,action) => {
            state.error = action.payload
            state.uploaded = false
        })
        .addCase(getOnePortfolio.fulfilled,(state,action) => {
            state.currentPortfolio = action.payload
        })
    }
})

export default portfolioSlice.reducer
export const  {resetPortfolio} = portfolioSlice.actions