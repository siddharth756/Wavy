import { createSlice } from "@reduxjs/toolkit"

const musicPlayerSlice = createSlice({
    name: 'player',
    initialState: {
      currentTrack: null,
      isPlaying: false,
      isPlayingPd: false,
    },
    reducers: {
      playTrack: (state, action) => {
        state.currentTrack = action.payload;
        state.isPlaying = true;
        state.isPlayingPd = true
      },
      pauseTrack: (state) => {
        state.isPlaying = false;
      },
      clearTrack: (state) =>{
        state.isPlayingPd = false;
        state.currentTrack = null
      }
    }
  });
  
export const { playTrack, pauseTrack, clearTrack } = musicPlayerSlice.actions
export default musicPlayerSlice.reducer;