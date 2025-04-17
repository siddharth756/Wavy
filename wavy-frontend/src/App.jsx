import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "../components/Navbar"
import Home from "../components/Home"
import NoPage from '../components/NoPage'
import AddAlbum from '../components/AddAlbum'
import AddTrack from '../components/AddTrack'
import AlbumDetail from '../components/Home/AlbumDetail'
import Player from '../components/Home/Player'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbums, fetchTracks } from '../features/musicSlice'


function App() {

  const dispatch = useDispatch()
  const { hasFetchedAlbums, hasFetchedTracks } = useSelector((state) => state.albums)

  useEffect(() => {
    if (!hasFetchedAlbums) {
      dispatch(fetchAlbums());
    }
  }, [hasFetchedAlbums, dispatch]);

  useEffect(() => {
    if (hasFetchedAlbums && !hasFetchedTracks) {
      dispatch(fetchTracks());
    }
  }, [hasFetchedAlbums, hasFetchedTracks, dispatch]);

  const selectedTrack = useSelector(state => state.albums.selectedTrack)
  const tracks = useSelector(state => state.albums.selectedAllTrack)

  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col md:flex-row text-white">
          {/* Left Navbar */}
          <div>
            <Navbar />
          </div>

          {/* Right: Main Content */}
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/albums/:id" element={<AlbumDetail />} />
              <Route path="/album" element={<AddAlbum />} />
              <Route path="/track" element={<AddTrack />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </div>
        </div>


        {selectedTrack && tracks && (
            <Player tracks={tracks} selectedTrack={selectedTrack}/>
        )}
      </BrowserRouter>
    </>
  )
}

export default App;
