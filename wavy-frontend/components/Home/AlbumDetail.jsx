import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbumById, fetchTrackByTrackId, fetchTracksByAlbumId, clearSelectedItem } from '../../features/album/albumSlice'
import { useParams } from 'react-router-dom'
import Track from './Track'
import Player from './Player'
import { useNavigate } from 'react-router-dom';


function AlbumDetail() {
  const { id } = useParams()
  console.log(id)
  const dispatch = useDispatch()

  useEffect(() => {
    if (id) {
      dispatch(fetchAlbumById(id))
      console.log("done")
      dispatch(fetchTracksByAlbumId(id))
      console.log("done2")
      dispatch(clearSelectedItem())
    }
  }, [id, dispatch])
  
  const handleSelectTrack = (id) => {
    dispatch(fetchTrackByTrackId(id))
  }
  
  const navigate = useNavigate()

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/'); // Fallback to home page
    }
  };


  const album = useSelector((state) => state.albums.selectedItem)
  const tracks = useSelector((state) => state.albums.albumTracks)
  const selectedTrack = useSelector((state) => state.albums.selectedTrack)

  console.log("============== ", tracks)
  return (
    <>
      {album && tracks && (
        <div className="mt-3 grid grid-cols-1 xl:grid-cols-2">
          {/* First Column: Album Info & Player */}
          <div className='flex px-4 flex-col mt-5'>
            {/* Album Info */}
            <div className="flex flex-col justify-around px-4 md:flex-row items-center md:items-start text-white pt-8 pb-4 rounded-lg max-w-4xl mx-auto">
              {/* Album Image */}
              <div className="w-40 h-40 md:w-48 md:h-48 flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <img
                  src={`${album.albumImage}`}
                  alt={`${album.artist} Album Cover`}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              {/* Artist Info */}
              <div className="flex justify-between md:px-4 flex-col md:text-left h-full mt-2">
                <div>

                  <h2 className="text-2xl lg:text-4xl font-bold mb-2">{album.artist}</h2>
                  <p className="text-sm text-gray-300">{album.description}</p>
                  <p className="text-sm md:text-xl text-gray-300 mt-2">Total songs: {tracks.length}</p>
                </div>
                <button
                  onClick={handleBack}
                  className="text-gray-500 text-left pt-7 md:4 text-xl cursor-pointer"
                >
                  <i className='fa fa-arrow-left mr-2'></i>
                  <span className="text-xl lg:text-2xl">Back</span>
                </button>
              </div>
            </div>

            {/* Player */}
            {selectedTrack && (
              <Player tracks={tracks} selectedTrack={selectedTrack} />
            )}
          </div>

          {/* Second Column: Track List */}
          <div className="p-4">
            <Track album={album} tracks={tracks} onSelectTrack={handleSelectTrack} />
          </div>
        </div>
      )}

    </>
  );

}

export default AlbumDetail