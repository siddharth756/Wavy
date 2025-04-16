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

  return (
    <>
      <BrowserRouter>
        <Navbar />
        {/* <Player /> */}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path='/albums/:id' element={<AlbumDetail />}></Route>
          <Route path="/album" element={<AddAlbum />}></Route>
          <Route path="/track" element={<AddTrack />}></Route>
          <Route path="*" element={<NoPage />}></Route>
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App;
