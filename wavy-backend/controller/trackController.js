const { Track } = require('../models/track')

exports.postTrack = async (req, res) => {
    try {
        const { albumId } = req.body;
        if (!albumId) {
            return res.status(400).json({ message: 'albumId and title required.' });
        }
        const trackImage = req.files['trackImage']?.[0];
        const audioFile = req.files['audio']?.[0];
        
        if (!audioFile) {
            return res.status(400).json({ status: 'failed', message: 'Audio file is required.' });
        }
        if (!trackImage) {
            return res.status(400).json({ status: 'failed', message: 'Track Image is required.' });
        }
        
        const title = req.body.title || (audioFile ? audioFile.originalname : "Untitled");
        const artist = req.body.artist || "Unknown Artist";
        let trackImageUrl = trackImage.path;
        let audioUrl = audioFile.path;

        const newTrack = new Track({
            albumId: albumId,
            title: title,
            artist: artist,
            trackImage: trackImageUrl,
            audio: audioUrl,
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

exports.getTrackById = async (req, res) => {
    try {
        const track = await Track.findById(req.params.id);
        if (!track) {
            return res.status(404).json({ message: "Track not found" });
        }
        res.json({ status: "Success", track: track })
    } catch (err) {
        res.json({
            status: "failed",
            message: err
        })
    }
}