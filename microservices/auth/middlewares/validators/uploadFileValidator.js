module.exports.uploadFileValidator = (req, res, next) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "File is required" });
  }

  next();
};
