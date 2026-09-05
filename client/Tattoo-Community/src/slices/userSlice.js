import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

export const userRegistration = createAsyncThunk(
    'users/userRegistration',
    async function ({email,phone,password,status}, {rejectWithValue}) {

        try {

            const response = await fetch('/api/user/registration', {
                method:'POST',
                credentials:'include',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    email:email,
                    phone:phone,
                    password:password,
                    status:status
                })
            })

            const data = await response.json()

            if(!response.ok) {
                rejectWithValue(data.message)
            }

            return {
                user:data.user,
                message:data.message
            }
            
        } catch (error) {
            return rejectWithValue(error.message)
        }
        
    }
)

export const userLogin = createAsyncThunk(
    'users/userLogin',
    async function ({email,password}, {rejectWithValue}) {
        try {
            const response = await fetch('/api/user/login', {
                method:'POST',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    email:email,
                    password:password
                })
            })

            const data = await response.json()

            if(!response.ok) {
                rejectWithValue(data.message)
            }

            return {
                user:data.user,
                message:data.message
            }
            
        } catch (error) {
            return rejectWithValue(error.message)
        }
        
    }
)

const userSlice = createSlice({
    name:'users',
    initialState:{
        users:[],
        status:null,
        error:null,
        isAuth:false,
        currentUser:null,
    },
    extraReducers:(builder) => {
        builder
        .addCase(userRegistration.pending, (state,action) => {
            state.status = 'Загрузка'
            state.error = null
        })
        .addCase(userRegistration.fulfilled,(state,action) => {
            state.status = 'Успешно'
            state.users = action.payload
        })
        .addCase(userRegistration.rejected, (state,action) => {
            state.status = 'Отклонен'
            state.error = action.payload
        })
        .addCase(userLogin.pending, (state,action) => {
            state.status = 'Загрузка'
            state.error = null
        })
        .addCase(userLogin.fulfilled, (state,action) => {
            state.status = 'Успешно'
            state.isAuth = true
            state.currentUser = action.payload
        })
        .addCase(userLogin.rejected, (state,action) => {
            state.status = 'Отклонен'
            state.isAuth = false
            state.currentUser = null
            state.error = action.payload
        })
    }
})

export default userSlice.reducer