const mongoose = require('mongoose');

const TranscriptSchema = new mongoose.Schema({
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true
  },
  content: {
    type: String,
    required: [true, 'Transcript content is required']
  },
  segments: [{
    start: Number,
    end: Number,
    text: String
  }],
  language: {
    type: String,
    default: 'en'
  },
  status: {
    type: String,
    enum: ['draft', 'edited', 'final'],
    default: 'draft'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transcript', TranscriptSchema);
