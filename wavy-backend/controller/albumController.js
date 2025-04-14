const { Album } = require("../models/album")
const { Track } = require("../models/track")

exports.getAlbums = async (req, res) => {
    const albums = await Album.find()
    res.json({
        status: 'success',
        albums
    })
}

exports.postAlbum = async (req, res) => {
        try {
            const { artist, description } = req.body;
            if (!artist || !description) {
                return res.status(400).json({ message: 'Artist and description are required' });
            }
            let albumImage = null;
    
            if (req.file) {
                albumImage = req.file.path; // cloudinary handles file upload via multer-storage-cloudinary
            }
    
            const newAlbum = new Album({
                artist: artist,
                description: description,
                albumImage: albumImage
            })
            await newAlbum.save()
            res.json({
                status: "success",
                message: "Album created successfully.",

            })
        } catch (err) {
            res.json({
                status: "failed",
                message: err.message
            })
        }
}


exports.getAlbumById = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        if (!album) {
            return res.status(404).json({ message: "Album not found" });
        }
        res.json({ status: "Success", album })
    } catch (err) {
        res.json({
            status: "failed",
            message: err.message
        })
    }
}


exports.getTracksByAlbumId = async (req, res) => {
    try {
        const albumTrack = await Track.find({ albumId: req.params.id });
        if (!albumTrack) {
            return res.status(404).json({ message: "Album Tracks not found" });
        }
        res.json({ status: "Success", Tracks: albumTrack })
    } catch (err) {
        res.json({
            status: "failed",
            message: err.message
        })
    }
}