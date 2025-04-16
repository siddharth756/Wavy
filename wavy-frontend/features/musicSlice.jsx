import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const fetchAlbums = createAsyncThunk('albums/fetchAlbums', async () => {
    const res = await axios.get(`${API_URL}/api/albums`)
    console.log("Albums: ", res.data)
    return res.data.albums;
})
export const fetchTracks = createAsyncThunk('albums/fetchTracks', async () => {
    const res = await axios.get(`${API_URL}/api/tracks`)
    console.log("Tracks : ", res.data)
    return res.data.tracks;
})


export const createAlbum = createAsyncThunk('albums/createAlbum', async (formData) => {
    try {
        const res = await axios.post(`${API_URL}/api/albums`, formData)
        console.log("created album")
        return res.data
    } catch (error) {
        console.log(error)
    }
})
export const createTrack = createAsyncThunk('albums/createTrack', async (formData) => {
    try {
        const res = await axios.post(`${API_URL}/api/tracks`, formData)
        console.log("created track")
        return res.data
    } catch (error) {
        console.log(error)
    }
})


const initialState = {
    allAlbums: localStorage.getItem('albums') ? JSON.parse(localStorage.getItem('albums')) : [],
    allTracks: localStorage.getItem('tracks') ? JSON.parse(localStorage.getItem('tracks')) : [],
    hasFetchedAlbums: !!localStorage.getItem('albums'),
    hasFetchedTracks: !!localStorage.getItem('tracks'),
    albumLoading: false,
    trackLoading: false,
    detailLoading: false,
    error: null,
    loading: false
}

const musicSlice = createSlice({
    name: 'albums',
    initialState,
    extraReducers: (builder) => {
        builder
            // Albums
            .addCase(fetchAlbums.pending, (state) => {
                state.albumLoading = true;
                state.error = null;
            })
            .addCase(fetchAlbums.fulfilled, (state, action) => {
                console.log("payload : ", action.payload)
                state.albumLoading = false;
                state.allAlbums = action.payload;
                state.hasFetchedAlbums = true;
                localStorage.setItem('albums', JSON.stringify(action.payload));
            })
            .addCase(fetchAlbums.rejected, (state, action) => {
                state.albumLoading = false;
                state.error = action.error.message;
            })


            // Tracks
            .addCase(fetchTracks.pending, (state) => {
                state.trackLoading = true;
                state.error = null;
            })
            .addCase(fetchTracks.fulfilled, (state, action) => {
                console.log("payload : ", action.payload)
                state.trackLoading = false;
                state.allTracks = action.payload;
                state.hasFetchedTracks = true;
                localStorage.setItem('tracks', JSON.stringify(action.payload));
            })
            .addCase(fetchTracks.rejected, (state, action) => {
                state.trackLoading = false;
                state.error = action.error.message;
            })

            // albumCreate 
            .addCase(createAlbum.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAlbum.fulfilled, (state, action) => {
                state.loading = false;
                const exist = state.allAlbums.some(item => item._id === action.payload._id);
                if (!exist) {
                    state.allAlbums = [...state.allAlbums, action.payload.newAlbum];
                    localStorage.setItem('albums', JSON.stringify(state.allAlbums));
                }
            })
            .addCase(createAlbum.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // trackCreate 
            .addCase(createTrack.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTrack.fulfilled, (state, action) => {
                state.loading = false;
                const exist = state.allTracks.some(item => item._id === action.payload._id);
                if (!exist) {
                    state.allTracks = [...state.allTracks, action.payload.newTrack];
                    localStorage.setItem('tracks', JSON.stringify(state.allTracks));
                }
            })
            .addCase(createTrack.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export default musicSlice.reducer;