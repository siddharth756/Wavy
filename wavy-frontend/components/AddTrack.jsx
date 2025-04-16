import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createTrack } from '../features/musicSlice'
import { useSelector } from 'react-redux'
import axios from 'axios'


function AddTrack() {

  const allAlbums = useSelector(state => state.albums.allAlbums)
  const loading = useSelector(state => state.albums.loading)

  const [albumName, setalbumName] = useState('')
  const [title, settitle] = useState('')
  const [artist, setartist] = useState('')
  const [trackImage, settrackImage] = useState(null)
  const [audio, setaudio] = useState(null)
  const [albumId, setalbumId] = useState(null)
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch()

  useEffect(() => {
    if (albumName) {
      const res = allAlbums.find((item) => item.artist.toLowerCase() === albumName.toLowerCase())
      setalbumId(res ? res._id : null)
    };
  }, [albumName, allAlbums])

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!albumId) {
      alert('Invalid album name.');
      return;
    }


    const cloudName = import.meta.env.VITE_CLOUD_NAME;
    const cloudUploadPreset = import.meta.env.VITE_CLOUD_UPLOAD_PRESET;
    const audioUploadPreset = import.meta.env.VITE_CLOUD_AUDIO_PRESET;
    const trackUploadPreset = import.meta.env.VITE_CLOUD_TRACKIMAGE_PRESET;


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

    console.log("done")

    const formData = new FormData();
    formData.append("albumId", albumId);
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("trackImage", trackImageUrl);
    formData.append("audio", audioUrl);

    try {
      let response = await dispatch(createTrack(formData)).unwrap();

      if (response.status === "success") {
        setSuccessMessage(`Track added successfully!`);

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }
    } catch (error) {
      console.log(error)
    }

    setalbumId(null)
    setalbumName('')
    setartist('')
    settitle('')
    settrackImage(null)
    setaudio(null)
  }

  return (
    <div className="flex items-center justify-center pb-10 px-4 mt-10">
      <form className="backdrop-blur-md shadow-black bg-gradient-to-br from-blue-500/10 to-purple-900/10 text-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-6 lg:w-[900px] xl:w-[1200px]" onSubmit={handlesubmit}>
        <h2 className="text-3xl font-bold text-center mb-6">Add Track</h2>


        {loading &&
          <p className="text-white-400 mt-5 text-md text-center animate-pulse">
            Processing...
          </p>
        }

        {successMessage &&
          <p className="text-green-400 mt-5 text-md text-center animate-pulse">
            {successMessage}
          </p>
        }

        {/* Album Name */}
        <div>
          <label className="block text-base font-medium mb-2">Album Name</label>
          <input
            type="text"
            value={albumName}
            onChange={(e) => setalbumName(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Album Name"
          />
        </div>

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

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-full bg-gradient-to-r from-blue-700 to-indigo-900 text-white shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all text-lg font-semibold"
        >
          Add Track
        </button>
      </form>
    </div>

  )
}

export default AddTrack