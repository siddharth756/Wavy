import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const fetchAlbums = createAsyncThunk('albums/fetchAlbums', async () => {
    const res = await axios.get(`${API_URL}/api/albums`)
    return res.data.albums;
})

export const fetchAlbumById = createAsyncThunk('albums/fetchAlbumById', async (id) => {
    const res = await axios.get(`${API_URL}/api/albums/${id}`);
    return res.data.album;
})
export const fetchTracksByAlbumId = createAsyncThunk('albums/fetchTracksByAlbumId', async (id) => {
    const res = await axios.get(`${API_URL}/api/albums/${id}/tracks`);
    return res.data.tracks;
})

export const fetchTrackByTrackId = createAsyncThunk('albums/fetchTrackByTrackId', async (id) => {
    const res = await axios.get(`${API_URL}/api/tracks/${id}`)
    return res.data.track;
})

export const createAlbum = createAsyncThunk('albums/createAlbum',async (formData) => {
    try {
        const res = await axios.post(`${API_URL}/api/albums`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const createTrack = createAsyncThunk('albums/createTrack',async (formData) => {
    try {
        const res = await axios.post(`${API_URL}/api/tracks`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
        return res.data
    } catch (error) {
        console.log(error)
    }
})

const initialState = {
    allItems: [],
    albumTracks: [],
    selectedItem: null,
    selectedTrack: null,
}

const musicSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {
        clearSelectedItem: (state) => {
            state.selectedItem = null
            state.selectedTrack = null
        },
        clearSelectedTrack: (state) => {
            state.selectedTrack = null
        }
    },
    extraReducers: (builder) => {
        builder
            // home - Albums
            .addCase(fetchAlbums.fulfilled, (state, action) => {
                state.allItems = action.payload;
            })

            // albumsDetail 
            .addCase(fetchAlbumById.fulfilled, (state, action) => {
                state.selectedItem = action.payload
            })
            .addCase(fetchTracksByAlbumId.fulfilled, (state, action) => {
                state.albumTracks = action.payload;
            })

            // home - player
            .addCase(fetchTrackByTrackId.fulfilled, (state, action) => {
                state.selectedTrack = action.payload
            })

            // albumCreate 
            .addCase(createAlbum.fulfilled, (state,action) => {
                state.allItems.push(action.payload)
            })
    }
});

export const { clearSelectedItem, clearSelectedTrack } = musicSlice.actions;
export default musicSlice.reducer;