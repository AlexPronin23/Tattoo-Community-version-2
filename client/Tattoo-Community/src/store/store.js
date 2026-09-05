import {configureStore} from '@reduxjs/toolkit'
import tattooMasterReducer from '../slices/tattooMastersSlice'
import userReducer from '../slices/userSlice'

export default configureStore({
    reducer:{
        tattooMasters:tattooMasterReducer,
        users: userReducer,
    }
})