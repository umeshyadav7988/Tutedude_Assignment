// --- models/Progress.js ---
const mongoose = require('mongoose');

const intervalSchema = new mongoose.Schema({
  start: Number,
  end: Number,
});

const progressSchema = new mongoose.Schema({
  userId: String,
  videoId: String,
  watchedIntervals: [intervalSchema],
  lastWatchedPosition: Number,
});

module.exports = mongoose.model('Progress', progressSchema);