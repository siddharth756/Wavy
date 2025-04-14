const connectDB = require('../../utils/connectDB')
const { getTracksByAlbumId, getAlbumById, getAlbums, postAlbum } = require('../../controller/albumController')
const { upload } = require('../../middleware/multer')
const express = require('express');
// const cors = require('cors');

const app = express()

app.use((req, res, next) => {
  const allowedOrigins = [process.env.ALLOWED_ORIGIN_URL1, process.env.ALLOWED_ORIGIN_URL2];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    console.log(`CORS allowed for origin: ${origin}`);
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    console.log(`CORS blocked for origin: ${origin}`);
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