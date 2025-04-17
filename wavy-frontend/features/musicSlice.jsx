import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const fetchAlbums = createAsyncThunk('albums/fetchAlbums', async () => {
    const res = await axios.get(`${API_URL}/api/albums`)
    return res.data.albums;
})
export const fetchTracks = createAsyncThunk('albums/fetchTracks', async () => {
    const res = await axios.get(`${API_URL}/api/tracks`)
    return res.data.tracks;
})


export const createAlbum = createAsyncThunk('albums/createAlbum', async (formData) => {
    try {
        const res = await axios.post(`${API_URL}/api/albums`, formData)
        return res.data
    } catch (error) {
        console.log(error)
    }
})
export const createTrack = createAsyncThunk('albums/createTrack', async (formData) => {
    try {
        const res = await axios.post(`${API_URL}/api/tracks`, formData)
        return res.data
    } catch (error) {
        console.log(error)
    }
})


const initialState = {
    allAlbums: sessionStorage.getItem('albums') ? JSON.parse(sessionStorage.getItem('albums')) : [],
    allTracks: sessionStorage.getItem('tracks') ? JSON.parse(sessionStorage.getItem('tracks')) : [],
    hasFetchedAlbums: !!sessionStorage.getItem('albums'),
    hasFetchedTracks: !!sessionStorage.getItem('tracks'),
    albumLoading: false,
    trackLoading: false,
    detailLoading: false,
    error: null,
    loading: false,
    selectedTrack: null,
    selectedAllTrack: []
}

const musicSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {
        setTrack: (state, action) => {
            state.selectedTrack = action.payload
        },
        setAllTrack: (state, action) => {
            state.selectedAllTrack = action.payload
        }
    },
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
                sessionStorage.setItem('albums', JSON.stringify(action.payload));
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
                state.trackLoading = false;
                state.allTracks = action.payload;
                state.hasFetchedTracks = true;
                sessionStorage.setItem('tracks', JSON.stringify(action.payload));
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
                    sessionStorage.setItem('albums', JSON.stringify(state.allAlbums));
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
                    sessionStorage.setItem('tracks', JSON.stringify(state.allTracks));
                }
            })
            .addCase(createTrack.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export const { setTrack,setAllTrack } = musicSlice.actions
export default musicSlice.reducer;