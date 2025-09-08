const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_CLOUD_KEY,
  api_secret: CLOUDINARY_CLOUD_SECRET,
});

module.exports = cloudinary;
