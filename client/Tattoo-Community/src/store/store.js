import {configureStore} from '@reduxjs/toolkit'
import tattooMasterReducer from '../slices/tattooMastersSlice'
import userReducer from '../slices/userSlice'
import styleReducer from '../slices/styleSlice'

export default configureStore({
    reducer:{
        tattooMasters:tattooMasterReducer,
        users: userReducer,
        styles:styleReducer
    }
})