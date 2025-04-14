const connectDB = require('../../utils/connectDB')
const { getTracksByAlbumId, getAlbumById, getAlbums, postAlbum } = require('../../controller/albumController')
const { upload } = require('../../middleware/multer')
const express = require('express');
// const cors = require('cors');

const app = express()

app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:5173', 'https://wavy-three.vercel.app'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

app.use(async (req,res, next) => {
  await connectDB()
  next()
})

app.get("/",)
app.get("/api/albums", getAlbums)
app.get("/api/albums/:id", getAlbumById)
app.get("/api/albums/:id/tracks", getTracksByAlbumId)


app.post("/api/albums", upload.single('albumImage'), postAlbum)

module.exports = app