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
        const res = await axios.post(`${API_URL}/api/albums`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        return res.data
    } catch (error) {
        console.log(error)
    }
})
export const createTrack = createAsyncThunk('albums/createTrack', async (formData) => {
    try {
        const res = await axios.post(`${API_URL}/api/tracks`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        return res.data
    } catch (error) {
        console.log(error)
    }
})


const initialState = {
    allAlbums: localStorage.getItem('albums') ? JSON.parse(localStorage.getItem('albums')) : null,
    allTracks: localStorage.getItem('tracks') ? JSON.parse(localStorage.getItem('tracks')) : null,
    hasFetchedAlbums: !!localStorage.getItem('albums'),
    hasFetchedTracks: !!localStorage.getItem('tracks'),
    albumLoading: false,
    trackLoading: false,
    detailLoading: false,
    error: null,
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
            .addCase(fetchAlbums.pending, (state) => {
                state.trackLoading = true;
                state.error = null;
            })
            .addCase(fetchAlbums.fulfilled, (state, action) => {
                state.trackLoading = false;
                state.allTracks = action.payload;
                state.hasFetchedTracks = true;
                localStorage.setItem('tracks', JSON.stringify(action.payload));
            })
            .addCase(fetchAlbums.rejected, (state, action) => {
                state.trackLoading = false;
                state.error = action.error.message;
            })

            // albumCreate 
            .addCase(createAlbum.fulfilled, (state, action) => {
                const existing = state.allAlbums.find(item => item._id === action.payload._id);
                if (!existing) {
                    state.allAlbums.push(action.payload);
                }
            })

            // trackCreate 
            .addCase(createTrack.fulfilled, (state, action) => {
                const existing = state.allTracks.find(item => item._id === action.payload._id);
                if (!existing) {
                    state.allTracks.push(action.payload);
                }
            })
    }
});

// export const { clearSelectedItem, clearSelectedTrack } = musicSlice.actions;
export default musicSlice.reducer;