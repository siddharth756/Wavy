const connectDB = require('../../utils/connectDB')
const { getTrackById, postTrack  } = require('../../controller/trackController')
const { upload } = require('../../middleware/multer')
const express = require('express');

const app = express()

app.use(async (req,res, next) => {
  await connectDB()
  next()
})

app.get("/api/tracks/:id", getTrackById)
app.post("/api/tracks", upload.fields([
    { name: 'trackImage', maxCount: 1 },
    { name: 'audio', maxCount: 1 }
  ]), postTrack)

module.exports = app