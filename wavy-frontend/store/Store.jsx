import { configureStore } from '@reduxjs/toolkit'
import musicSlice from '../features/musicSlice'
import musicPlayerSlice from '../features/musicPlayerSlice'

const store =  configureStore({
    reducer: {
        albums: musicSlice,
        player: musicPlayerSlice
    }
})


export default store;