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
            const { artist, description, albumImage } = req.body;
            if (!artist || !albumImage) {
                return res.status(400).json({ message: 'Album name and image are required' });
            }
    
            const newAlbum = new Album({
                artist: artist,
                description: description || "Top Best Songs.",
                albumImage: albumImage
            })
            await newAlbum.save()
            res.json({
                status: "success",
                message: "Album created successfully.",
                newAlbum
            })
        } catch (err) {
            res.json({
                status: "failed",
                message: err.message
            })
        }
}