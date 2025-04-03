const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = 'uploads/';
    
    // Determine upload directory based on file type
    if (file.fieldname === 'video') {
      uploadPath += 'videos/';
    } else if (file.fieldname === 'image' || file.fieldname === 'productImage') {
      uploadPath += 'images/';
    } else if (file.fieldname === 'thumbnail') {
      uploadPath += 'thumbnails/';
    } else if (file.fieldname === 'voiceover') {
      uploadPath += 'voiceovers/';
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Accept videos, images, and audio files
  if (file.fieldname === 'video') {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Not a video file! Please upload only videos.'), false);
    }
  } else if (file.fieldname === 'image' || file.fieldname === 'thumbnail' || file.fieldname === 'productImage') {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image file! Please upload only images.'), false);
    }
  } else if (file.fieldname === 'voiceover') {
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an audio file! Please upload only audio files.'), false);
    }
  } else {
    cb(null, true);
  }
};

// Initialize upload
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB max file size
  }
});

module.exports = { upload };
