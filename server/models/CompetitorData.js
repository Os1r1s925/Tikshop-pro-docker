const mongoose = require('mongoose');

const CompetitorDataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  competitorName: {
    type: String,
    required: [true, 'Competitor name is required']
  },
  tiktokUsername: {
    type: String,
    required: [true, 'TikTok username is required']
  },
  shopUrl: {
    type: String
  },
  videos: [{
    videoId: String,
    title: String,
    url: String,
    views: Number,
    likes: Number,
    comments: Number,
    shares: Number,
    products: [{
      name: String,
      price: Number,
      url: String
    }]
  }],
  analytics: {
    totalVideos: Number,
    averageViews: Number,
    averageLikes: Number,
    averageComments: Number,
    averageShares: Number,
    topPerformingCategories: [String],
    postFrequency: Number
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CompetitorData', CompetitorDataSchema);
