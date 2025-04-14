import { configureStore } from '@reduxjs/toolkit'
import musicSlice from '../features/musicSlice'

const store =  configureStore({
    reducer: {
        albums: musicSlice
    }
})


export default store;