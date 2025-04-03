const mongoose = require('mongoose');

const VideoProductSchema = new mongoose.Schema({
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  timestamp: {
    type: Number,
    required: true,
    comment: 'Timestamp in seconds where the product appears in the video'
  },
  duration: {
    type: Number,
    default: 5,
    comment: 'Duration in seconds that the product appears'
  },
  position: {
    x: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      comment: 'X position as percentage of video width'
    },
    y: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      comment: 'Y position as percentage of video height'
    }
  },
  tagType: {
    type: String,
    enum: ['manual', 'automatic'],
    default: 'manual'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to ensure a product can only be tagged once at a specific timestamp
VideoProductSchema.index({ video: 1, product: 1, timestamp: 1 }, { unique: true });

module.exports = mongoose.model('VideoProduct', VideoProductSchema);
