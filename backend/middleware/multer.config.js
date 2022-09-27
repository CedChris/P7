const multer = require('multer');
const sharp = require('sharp')

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log(file);
    callback(null, 'image');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    callback(null, name + Date.now() + '.' + MIME_TYPES[file.mimetype]);
  }
});

module.exports = multer({storage: storage}).single('image');