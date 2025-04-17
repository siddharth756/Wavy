import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAllTrack, setTrack } from '../../features/musicSlice'
import Loader from "../Loader"

function Track({ tracks }) {
  const [isPlayerVisible, setisPlayerVisible] = useState(false)
  const dispatch = useDispatch()
  const trackLoading = useSelector(state => state.albums.trackLoading)
  const getTrackById = (tracks, id) => {
    if (!tracks || tracks.length === 0) return null;
    return tracks.find(track => track._id === id);
  };

  const handleSelectTrack = (id) => {
    let track = getTrackById(tracks, id)
    if (track && tracks) {
      dispatch(setTrack(track));
      dispatch(setAllTrack(tracks))
      setisPlayerVisible(true)
    }
  }

  return (
    <>
    <div className="lg:px-5 md:mt-6">
      <h1 className="font-bold text-2xl lg:text-3xl text-white pl-6 md:pt-10 pt-6">Tracks</h1>

      {trackLoading ? (
        <Loader />
      ) : tracks.length === 0 ? (
        <div className="flex items-center mt-18 justify-center">
          <h1 className="album-header-1 text-gray-400 text-center text-2xl">
            Tracks are not available.
          </h1>
        </div>
      ) : (
        <div className={`grid gap-4 md:px-6 py-4 px-5 md:pt-6 ${ isPlayerVisible ? 'pb-44' : 'pb-10'}`}>
          {tracks.map((track) => (
            <div
              key={track._id}
              onClick={() => handleSelectTrack(track._id)}
              className="px-2 rounded bg-gradient-to-r from-neutral-700 cursor-pointer text-white flex items-center gap-4 hover:scale-[1.02] py-2 transition-all text-[12px]"
            >
              <img
                src={`${track.trackImage || '../../src/assets/track.png'}`}
                alt={track.artist}
                className="md:w-16 md:h-16 h-10 w-10 object-cover rounded-md"
                loading='lazy'
              />
              <div className="flex flex-col flex-grow">
                <p className="md:text-lg font-bold">{track.title}</p>
                <p className="text-sm text-[8px] mt-1 md:text-[12px]">{track.artist}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    </>
  )
}

export default Track