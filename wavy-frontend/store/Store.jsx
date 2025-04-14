import { configureStore } from '@reduxjs/toolkit'
import albumReducers from '../features/album/albumSlice'

const store =  configureStore({
    reducer: {
        albums: albumReducers
    }
})


export default store;