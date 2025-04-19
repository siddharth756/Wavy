import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Track from './Track'
import useAlbumWithTracks from '../../helper/useAlbumWithTracks'

function AlbumDetail() {
  const { id } = useParams();
  const { album, tracks } = useAlbumWithTracks(id);

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
      <div className="grid grid-cols-1 xl:grid-cols-2 overflow-y-hidden">

        {/* First Column: Album Info & Player */}
        <div className='flex px-4 flex-col h-fit md:mt-10'>
        <button
          onClick={handleBack}
          className="text-gray-400 hover:text-white mt-5 ml-6 md:ml-5 w-fit text-left text-xl cursor-pointer"
        >
          <span className="text-xl lg:text-2xl">Back</span>
        </button>
          {/* Album Info */}
          {album &&
            <div className="flex flex-col justify-around px-4 md:flex-row items-center md:items-start text-white pt-4 md:pt-8 pb-4 rounded-lg max-w-4xl mx-auto">
              {/* Album Image */}
              <div className="w-40 h-40 md:w-48 md:h-48 flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <img
                  src={`${album.albumImage}`}
                  alt={`${album.artist} Album Cover`}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              {/* Artist Info */}
              <div className="flex flex-col justify-between h-full md:h-44 md:px-4 mt-2 text-white">
                <div>
                  <h2 className="text-2xl lg:text-4xl font-bold mb-2">{album.artist}</h2>
                  <p className="text-sm text-gray-300">{album.description}</p>
                  <p className="text-sm md:text-lg text-gray-300 mt-2">Total songs: {tracks.length}</p>
                </div>
              </div>

            </div>
          }

        </div>

        {tracks &&
          <div>
            <Track tracks={tracks} />
          </div>
        }
      </div>

    </>
  );

}

export default AlbumDetail