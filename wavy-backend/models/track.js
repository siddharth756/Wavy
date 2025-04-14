const mongoose = require('mongoose')

const trackSchema = new mongoose.Schema({
    albumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
        required: true
    },
    title: {
        type: String,
        required: [true,"title required."]
    },
    artist: {
        type: String
    },
    trackImage: {
        type: String,
        required: [true, "trackImage required."]
    },
    audio: {
        type: String,
        required: [true,"audio required."]
    }
},{timestamps: true});

const Track = mongoose.models.tracks || mongoose.model('Track',trackSchema)
module.exports = { Track }