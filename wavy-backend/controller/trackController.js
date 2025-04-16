const { Track } = require('../models/track')

exports.getTrack = async (req, res) => {
    const tracks = await Track.find()
    res.json({
        status: 'success',
        tracks
    })
}

exports.postTrack = async (req, res) => {
    try {
        const { albumId, trackImage, audio } = req.body;
        if (!albumId || !trackImage || !audio) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }
        
        const title = req.body.title ? req.body.title : "Untitled";
        const artist = req.body.artist ? req.body.artist : "Unknown Artist";

        const newTrack = new Track({
            albumId: albumId,
            title: title,
            artist: artist,
            trackImage: trackImage,
            audio: audio,
        })
        await newTrack.save()

        res.json({
            status: "success",
            message: "Track created successfully.",
            newTrack
        })
    } catch (err) {
        res.json({
            status: "failed",
            message: err.message
        })
    }
}