const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  userId: String,
  videoId: String,
  lastPosition: Number,
  intervals: [[Number]],
  videoDuration: Number,
  progress: Number
});

module.exports = mongoose.model('UserProgress', userProgressSchema);
