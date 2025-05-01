const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');

// GET user progress
router.get('/:userId/:videoId', async (req, res) => {
  const { userId, videoId } = req.params;
  try {
    const data = await Progress.findOne({ userId, videoId });
    res.json(data || {});
  } catch (err) {
    res.status(500).json({ error: 'Error fetching progress' });
  }
});

// POST/UPDATE user progress
router.post('/', async (req, res) => {
  const { userId, videoId, watchedIntervals, lastWatchedTime, progressPercent } = req.body;
  try {
    let progress = await Progress.findOne({ userId, videoId });
    if (progress) {
      progress.watchedIntervals = watchedIntervals;
      progress.lastWatchedTime = lastWatchedTime;
      progress.progressPercent = progressPercent;
      await progress.save();
    } else {
      progress = new Progress({ userId, videoId, watchedIntervals, lastWatchedTime, progressPercent });
      await progress.save();
    }
    res.json({ message: 'Progress saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error saving progress' });
  }
});

module.exports = router;
