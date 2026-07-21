import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTrack } from '../features/musicSlice'
import { useSelector } from 'react-redux'
import axios from 'axios'


function AddTrack() {

  const allAlbums = useSelector(state => state.albums.allAlbums)
  const [albumId, setalbumId] = useState('')
  const [title, settitle] = useState('')
  const [artist, setartist] = useState('')
  const [trackImage, settrackImage] = useState(null)
  const [audio, setaudio] = useState(null)
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Link mode state
  const [mode, setMode] = useState('link') // 'link' or 'upload'
  const [musicUrl, setMusicUrl] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [fetchedData, setFetchedData] = useState(null)
  const [fetchError, setFetchError] = useState('')

  const dispatch = useDispatch()

  const handleFetchFromLink = async () => {
    if (!musicUrl.trim()) {
      setFetchError('Please paste a music URL.')
      return
    }

    setIsFetching(true)
    setFetchError('')
    setFetchedData(null)

    try {
      const musicApiUrl = import.meta.env.VITE_MUSIC_API_URL
      const musicApiKey = import.meta.env.VITE_MUSIC_API_KEY

      const headers = {}
      if (musicApiKey) {
        headers['x-api-key'] = musicApiKey
      }

      const res = await axios.post(
        `${musicApiUrl}/api/download`,
        { url: musicUrl },
        { headers, timeout: 120000 } // 2 min timeout for slow downloads
      )

      if (res.data.status === 'success') {
        setFetchedData(res.data)
        settitle(res.data.title || '')
        setartist(res.data.artist || '')
      } else {
        setFetchError('Failed to fetch track. Please try a different link.')
      }
    } catch (error) {
      const message = error.response?.data?.detail
        || error.message
        || 'Something went wrong. Please try again.'
      setFetchError(message)
    } finally {
      setIsFetching(false)
    }
  }

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!albumId) {
      alert('Please select an album.');
      return;
    }

    if (mode === 'link') {
      // Link mode — use fetched data
      if (!fetchedData) {
        alert('Please fetch a track first.');
        return;
      }

      setIsLoading(true);

      try {
        const formData = new FormData();
        formData.append("albumId", albumId);
        formData.append("title", title || fetchedData.title);
        formData.append("artist", artist || fetchedData.artist);
        formData.append("trackImage", fetchedData.trackImage);
        formData.append("audio", fetchedData.audio);

        let response = await dispatch(createTrack(formData)).unwrap();

        if (response.status === "success") {
          setSuccessMessage(`Track added successfully!`);
          setTimeout(() => setSuccessMessage(""), 3000);
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
        resetForm()
      }

    } else {
      // Upload mode — existing flow
      setIsLoading(true);

      const cloudName = import.meta.env.VITE_CLOUD_NAME;
      const cloudUploadPreset = import.meta.env.VITE_CLOUD_UPLOAD_PRESET;
      const audioUploadPreset = import.meta.env.VITE_CLOUD_AUDIO_PRESET;
      const trackUploadPreset = import.meta.env.VITE_CLOUD_TRACKIMAGE_PRESET;

      try {
        // 🔹 Upload audio
        const audioData = new FormData()
        audioData.append('file', audio);
        audioData.append("folder", audioUploadPreset);
        audioData.append("upload_preset", cloudUploadPreset);

        const audioRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
          audioData
        );
        const audioUrl = audioRes.data.secure_url;


        // 🔹 Upload image
        const imageData = new FormData();
        imageData.append('file', trackImage);
        imageData.append("folder", trackUploadPreset);
        imageData.append("upload_preset", cloudUploadPreset);
        const imageRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          imageData
        );
        const trackImageUrl = imageRes.data.secure_url;

        const formData = new FormData();
        formData.append("albumId", albumId);
        formData.append("title", title);
        formData.append("artist", artist);
        formData.append("trackImage", trackImageUrl);
        formData.append("audio", audioUrl);


        let response = await dispatch(createTrack(formData)).unwrap();

        if (response.status === "success") {
          setSuccessMessage(`Track added successfully!`);

          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
        resetForm()
      }
    }
  }

  const resetForm = () => {
    setalbumId('')
    setartist('')
    settitle('')
    settrackImage(null)
    setaudio(null)
    setMusicUrl('')
    setFetchedData(null)
    setFetchError('')
  }

  return (
    <div className="flex items-center justify-center pb-10 px-4 md:min-h-screen pt-5">
      <form className="backdrop-blur-md shadow-black bg-gradient-to-br from-blue-500/5 to-purple-500/2 text-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-6 lg:w-[900px] xl:w-[1200px]" onSubmit={handlesubmit}>
        <h2 className="text-3xl font-bold text-center mb-6">Add Track</h2>

        {successMessage &&
          <p className="text-green-400 mt-5 text-md text-center animate-pulse">
            {successMessage}
          </p>
        }

        {/* Mode Toggle */}
        <div className="flex rounded-lg overflow-hidden border border-gray-700">
          <button
            type="button"
            onClick={() => setMode('link')}
            className={`flex-1 py-2.5 text-sm font-semibold transition-all duration-300 ${mode === 'link'
              ? 'bg-gradient-to-r from-blue-700 to-indigo-900 text-white'
              : 'bg-transparent text-gray-400 hover:text-white'
              }`}
          >
            🔗 Paste Link
          </button>
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`flex-1 py-2.5 text-sm font-semibold transition-all duration-300 ${mode === 'upload'
              ? 'bg-gradient-to-r from-blue-700 to-indigo-900 text-white'
              : 'bg-transparent text-gray-400 hover:text-white'
              }`}
          >
           Manual Upload
          </button>
        </div>

        {/* Album Name */}
        <div>
          <label className="block text-base font-medium mb-2">Album Name</label>
          <div className="relative">
            <select
              value={albumId}
              onChange={(e) => setalbumId(e.target.value)}
              className={`form-select w-full px-4 py-3 pr-10 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${!albumId ? 'placeholder' : ''}`}
            >
              <option value="" disabled>Select an album</option>
              {allAlbums.map((album) => (
                <option key={album._id} value={album._id}>
                  {album.artist}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">
              <i className="fa fa-chevron-down text-sm" />
            </span>
          </div>
        </div>

        {/* ========== LINK MODE ========== */}
        {mode === 'link' && (
          <>
            {/* Music URL Input */}
            <div>
              <label className="block text-base font-medium mb-2">Music URL</label>
              <p className="text-xs text-gray-400 mb-2">
                Supports YouTube, Spotify, Gaana, SoundCloud, JioSaavn, and more
              </p>
              <div className="flex gap-3">
                <input
                  type="url"
                  value={musicUrl}
                  onChange={(e) => {
                    setMusicUrl(e.target.value)
                    setFetchError('')
                  }}
                  className="flex-1 px-4 py-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="https://youtube.com/watch?v=..."
                  disabled={isFetching}
                />
                <button
                  type="button"
                  onClick={handleFetchFromLink}
                  disabled={isFetching || !musicUrl.trim()}
                  className={`px-5 py-3 rounded-md font-semibold text-sm transition-all whitespace-nowrap ${isFetching || !musicUrl.trim()
                    ? 'bg-gray-600 cursor-not-allowed text-gray-300'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white'
                    }`}
                >
                  {isFetching ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Fetching...
                    </span>
                  ) : 'Fetch'}
                </button>
              </div>
            </div>

            {/* Fetch Error */}
            {fetchError && (
              <p className="text-red-400 text-sm text-center bg-red-500/10 rounded-md py-2 px-3">
                ⚠️ {fetchError}
              </p>
            )}

            {/* Fetching Progress */}
            {isFetching && (
              <div className="text-center py-6 space-y-3">
                <div className="flex justify-center">
                  <div className="w-10 h-10 border-3 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-gray-400 text-sm">
                  Downloading and processing audio... This may take up to 2 minutes.
                </p>
              </div>
            )}

            {/* Fetched Data Preview */}
            {fetchedData && (
              <div className="border border-gray-700 rounded-lg p-4 space-y-3 bg-white/5">
                <p className="text-sm text-green-400 font-semibold">Track fetched successfully!</p>
                <div className="flex gap-4 items-start">
                  {fetchedData.trackImage && (
                    <img
                      src={fetchedData.trackImage}
                      alt="Track cover"
                      className="w-20 h-20 rounded-lg object-cover shadow-md"
                    />
                  )}
                  <div className="flex-1 space-y-2">
                    {/* Editable Title */}
                    <div>
                      <label className="text-xs text-gray-400">Title</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => settitle(e.target.value)}
                        className="w-full px-3 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      />
                    </div>
                    {/* Editable Artist */}
                    <div>
                      <label className="text-xs text-gray-400">Artist</label>
                      <input
                        type="text"
                        value={artist}
                        onChange={(e) => setartist(e.target.value)}
                        className="w-full px-3 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* ========== UPLOAD MODE ========== */}
        {mode === 'upload' && (
          <>
            {/* Song Title */}
            <div>
              <label className="block text-base font-medium mb-2">Song Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => settitle(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Song Title"
              />
            </div>

            {/* Artist */}
            <div>
              <label className="block text-base font-medium mb-2">Artist</label>
              <input
                type="text"
                value={artist}
                onChange={(e) => setartist(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Artist Name"
              />
            </div>

            {/* Track Image */}
            <div>
              <label className="block text-base font-medium mb-2">Track Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length > 1) {
                    alert("Only one image allowed");
                    return;
                  }
                  settrackImage(e.target.files[0]);
                }}
                className="w-full px-4 py-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Audio File */}
            <div>
              <label className="block text-base font-medium mb-2">Audio File</label>
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => {
                  if (e.target.files.length > 1) {
                    alert("Only one audio allowed");
                    return;
                  }
                  setaudio(e.target.files[0]);
                }}
                className="w-full px-4 py-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading || (mode === 'link' && !fetchedData)}
          className={`w-full py-3 rounded-full text-white text-lg font-semibold transition-all shadow-md ${isLoading || (mode === 'link' && !fetchedData)
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-700 to-indigo-900 hover:from-blue-600 hover:to-indigo-700'
            }`}
        >
          {isLoading ? "Adding Track..." : "Add Track"}
        </button>

      </form>
    </div>

  )
}

export default AddTrack