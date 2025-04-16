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
            const { artist, albumImage } = req.body;
            if (!artist || !albumImage) {
                return res.status(400).json({ message: 'Album name and image are required' });
            }
            const description = req.body.description ? req.body.description : "Top Best Songs."
    
            const newAlbum = new Album({
                artist: artist,
                description: description,
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