const mongoose = require('mongoose')

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return; // already connected
  }

  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = connectDB
