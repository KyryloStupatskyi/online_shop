const cloudinary = require("../utils/cloudinaryConnection");
const streamifier = require("streamifier");

class CloudinaryService {
  async uploadImage(fileBuffer, dir) {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: dir, width: 200, height: 200, crop: "fill" },
        (err, result) => {
          if (err) reject(err);

          resolve(result);
        }
      );

      streamifier.createReadStream(fileBuffer).pipe(stream);
    });
  }

  async removeImage(public_id) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(public_id, (err, result) => {
        if (err) reject(err);

        resolve(result);
      });
    });
  }
}

module.exports = new CloudinaryService();
