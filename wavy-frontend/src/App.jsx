import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "../components/Navbar"
import Home from "../components/Home"
import NoPage from '../components/NoPage'
import AddAlbum from '../components/AddAlbum'
import AddTrack from '../components/AddTrack'
import AlbumDetail from '../components/Home/AlbumDetail'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbums } from '../features/album/albumSlice'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(fetchAlbums())
  }, [dispatch]);

  const { allItems } = useSelector((state) => state.albums)

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path='/albums/:id' element={<AlbumDetail />}></Route>
          <Route path="/album" element={<AddAlbum />}></Route>
          <Route path="/track" element={<AddTrack allItems={allItems}/>}></Route>
          <Route path="*" element={<NoPage />}></Route>
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App;
