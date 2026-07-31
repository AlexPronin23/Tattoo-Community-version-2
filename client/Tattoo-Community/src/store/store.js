import {configureStore} from '@reduxjs/toolkit'
import tattooMasterReducer from '../slices/tattooMastersSlice'

export default configureStore({
    reducer:{
        tattooMasters:tattooMasterReducer
    }
})