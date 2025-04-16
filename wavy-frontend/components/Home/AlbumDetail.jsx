import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Track from './Track'
import Player from './Player'
import Loader from '../Loader'
import useAlbumWithTracks from '../../helper/useAlbumWithTracks'

function AlbumDetail() {
  const [selectedTrack, setselectedTrack] = useState(null)
  const { id } = useParams();
  const { album, tracks } = useAlbumWithTracks(id);
  const { albumLoading, trackLoading } = useSelector((state) => state.albums)

  const getTrackById = (tracks, id) => {
    if (!tracks || tracks.length === 0) return null;
    return tracks.find(track => track._id === id);
  };

  const handleSelectTrack = (id) => {
    let track = getTrackById(tracks, id)
    setselectedTrack(track)
  }

  const navigate = useNavigate()
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/'); // Fallback to home page
    }
  };

  return (
    <>
      <div className="mt-3 grid grid-cols-1 xl:grid-cols-2">
        {/* First Column: Album Info & Player */}
        <div className='flex px-4 flex-col mt-5'>
          {/* Album Info */}
          {!albumLoading && album ?
          
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
            : <Loader />}



          {selectedTrack && (
            <Player tracks={tracks} selectedTrack={selectedTrack} />
          )}
        </div>

        {
          !trackLoading && tracks ? 
            <div className="p-4">
              <Track tracks={tracks} onSelectTrack={handleSelectTrack} />
            </div> : <Loader />
        }
      </div>

    </>
  );

}

export default AlbumDetail