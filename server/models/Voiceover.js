const mongoose = require('mongoose');

const VoiceoverSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video'
  },
  transcript: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transcript'
  },
  audioUrl: {
    type: String,
    required: [true, 'Audio URL is required']
  },
  voiceId: {
    type: String,
    required: [true, 'Voice ID is required']
  },
  voiceName: {
    type: String
  },
  duration: {
    type: Number
  },
  status: {
    type: String,
    enum: ['processing', 'completed', 'failed'],
    default: 'processing'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Voiceover', VoiceoverSchema);
