const mongoose = require('mongoose');

const intervalSchema = new mongoose.Schema({
  start: Number,
  end: Number
});

const progressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  videoId: { type: String, required: true },
  watchedIntervals: [intervalSchema],
  lastWatchedTime: Number,
  progressPercent: Number
});

module.exports = mongoose.model('Progress', progressSchema);
