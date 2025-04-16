import { createSlice } from "@reduxjs/toolkit"

const musicPlayerSlice = createSlice({
    name: 'player',
    initialState: {
      currentTrack: null,
      isPlaying: false,
    },
    reducers: {
      playTrack: (state, action) => {
        state.currentTrack = action.payload;
        state.isPlaying = true;
      },
      pauseTrack: (state) => {
        state.isPlaying = false;
      },
    }
  });
  
export const { playTrack, pauseTrack } = musicPlayerSlice.actions
export default musicPlayerSlice.reducer;