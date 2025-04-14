import React from 'react'

function Track({ album, tracks, onSelectTrack }) {

  return (
    <>
      {album && tracks.length > 0 ? (
        <div className="lg:px-10 rounded-4xl relative pb-6 md:pb-2">
          <h1 className="font-bold text-3xl lg:text-4xl text-white pl-6 py-8">Tracks</h1>
          {tracks.length == 0 ? <h1 className='text-center text-[16px] lg:text-[20px] my-6 opacity-50'>No Tracks are Available.</h1> : null}

          <div className="grid gap-4 md:px-6 px-2 lg:pb-14">
            {tracks.map((track) => (
              <div
                key={track._id}
                onClick={() => onSelectTrack(track._id)}
                className="md:p-4 px-2 py-2 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-900 cursor-pointer text-white flex items-center gap-4 hover:scale-[1.02] transition-all text-[12px]"
              >
                <img
                  src={`http://localhost:5000${track.trackImage || '../../src/assets/track.png'}`}
                  alt={track.artist}
                  className="md:w-16 md:h-16 h-10 object-cover rounded-md"
                />
                <div className="flex flex-col flex-grow">
                  <p className="md:text-lg font-bold">{track.title}</p>
                  <p className="text-sm text-[8px] md:text-[12px]">{track.artist}</p>
                </div>
                <p className="font-semibold lg:pr-6">{track.duration}</p>
              </div>
            ))}
          </div>

        </div>
      ) : <div className="flex items-center justify-center h-[60vh]">
      <h1 className="album-header-1 text-gray-400 text-center text-2xl md:text-4xl">
        Not Available
      </h1>
  </div>}
    </>
  )
}

export default Track