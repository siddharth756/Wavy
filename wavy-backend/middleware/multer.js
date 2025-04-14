const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = 'Wavy/misc'; // default folder in case fieldname doesn't match

    // Assign folder based on fieldname
    switch (file.fieldname) {
      case 'albumImage':
        folder = 'Wavy/albumImages';
        break;
      case 'trackImage':
        folder = 'Wavy/trackImages';
        break;
      case 'audio':
        folder = 'Wavy/audio';
        break;
    }

    return {
      folder,
      resource_type: 'auto', // Handles images and audio
      public_id: `${Date.now()}-${file.originalname}`, // Optional: custom filename
    };
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // Optional: limit size (e.g., 50MB)
  },
  fileFilter: (req, file, cb) => {
    // Optionally filter file types
    cb(null, true);
  }
});

module.exports = { upload };
