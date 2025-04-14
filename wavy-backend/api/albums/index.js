const connectDB = require('../../utils/connectDB')
const { getTracksByAlbumId, getAlbumById, getAlbums, postAlbum } = require('../../controller/albumController')
const { upload } = require('../../middleware/multer')
const express = require('express');
const cors = require('cors');

const app = express()

app.use(cors({
  origin: process.env.CROSS_ORIGIN_URL,
  methods: ['GET', 'POST','OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json()); 
app.options('*', cors());

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