const { Album } = require("../models/album")

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