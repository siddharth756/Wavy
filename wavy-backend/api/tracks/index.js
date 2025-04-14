const connectDB = require('../../utils/connectDB')
// const cors = require('cors');
const { getTrackById, postTrack  } = require('../../controller/trackController')
const { upload } = require('../../middleware/multer')
const express = require('express');

const app = express()

app.use((req, res, next) => {
  const allowedOrigins = [process.env.ALLOWED_ORIGIN_URL1, process.env.ALLOWED_ORIGIN_URL2, process.env.ALLOWED_ORIGIN_URL3];
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

app.get("/api/tracks/:id", getTrackById)
app.post("/api/tracks", upload.fields([
    { name: 'trackImage', maxCount: 1 },
    { name: 'audio', maxCount: 1 }
  ]), postTrack)

module.exports = app