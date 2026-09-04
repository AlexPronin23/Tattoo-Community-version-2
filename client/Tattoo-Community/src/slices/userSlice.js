import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


export const userRegistration = createAsyncThunk(
    'user/userRegistration',
    async function ({email,password,status}, {_,rejectWithValue}) {

        try {

            const response = await fetch('/api/user/registration', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    email:email,
                    password:password,
                    status:status

                })
            })

            if(!response.ok){
                let message = `Произошла ошибка ${response.status} ${response.statusText}`
                throw new Error(message)
            }

        
            const data = await response.json()

            return data.data
            
        } catch (error) {
            return rejectWithValue(error.message)
        }
        
    }
)

export const userSlice = createSlice({
    name:'user',
    initialState:{
        user:[],
        status:null,
        isAuthenticated: false,
        error:null
    },
    extraReducers:(builder) => {
        builder
        .addCase(userRegistration.fulfilled, (state,action) => {
            state.status = 'Успешно'
            state.user = action.payload
        })
        .addCase(userRegistration.rejected, (state,action) => {
            state.status = 'Отклонен'
            state.error = action.payload
        })
      
    }
})

export default userSlice.reducer