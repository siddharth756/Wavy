import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAlbum } from '../features/musicSlice'
import axios from 'axios'

function AddAlbum() {
  const [artist, setartist] = useState('')
  const [albumImage, setalbumImage] = useState(null)
  const [description, setdescription] = useState('')
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true)
    const cloudName = import.meta.env.VITE_CLOUD_NAME;
    const cloudUploadPreset = import.meta.env.VITE_CLOUD_UPLOAD_PRESET;
    const albumUploadPreset = import.meta.env.VITE_CLOUD_ALBUMIMAGE_PRESET;


    try {
      // 🔹 Upload image
      const imageData = new FormData();
      imageData.append('file', albumImage);
      imageData.append("folder", albumUploadPreset);
      imageData.append("upload_preset", cloudUploadPreset);
      const imageRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        imageData
      );
      const albumImageUrl = imageRes.data.secure_url;

      const formData = new FormData();
      formData.append("artist", artist);
      formData.append("albumImage", albumImageUrl);
      formData.append("description", description);

      let response = await dispatch(createAlbum(formData)).unwrap();
      if (response.status === "success") {
        setSuccessMessage("Album added successfully!");

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      setartist('')
      setalbumImage(null)
      setdescription('')
    }
  };


  return (
    <div className="flex items-center md:min-h-screen justify-center pb-10 px-4 pt-5">
      <form className="backdrop-blur-md shadow-black bg-gradient-to-br from-blue-500/5 to-purple-500/2 text-white rounded-xl shadow-lg p-8 w-full max-w-fit space-y-6"
        onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-4">Add Album</h2>

        {successMessage &&
          <p className="text-green-400 mt-5 text-md text-center animate-pulse">
            {successMessage}
          </p>
        }

        {/* Artist Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Album Name</label>
          <input
            type="text"
            value={artist}
            onChange={(e) => setartist(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Album Name"
          />
        </div>

        {/* Album Image */}
        <div>
          <label className="block text-sm font-medium mb-2">Album Image</label>
          <input
            type="file"
            accept='image/*'
            onChange={(e) => {
              if (e.target.files.length > 1) {
                alert("Only one image allowed");
                return;
              }
              setalbumImage(e.target.files[0]);
            }}
            className="w-full px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            placeholder="Write album description..."
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-full text-white text-lg font-semibold transition-all shadow-md ${isLoading
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-700 to-indigo-900 hover:from-blue-600 hover:to-indigo-700'
            }`}
        >
          {isLoading ? "Uploading..." : "Add Album"}
        </button>
      </form>
    </div>
  )
}

export default AddAlbum