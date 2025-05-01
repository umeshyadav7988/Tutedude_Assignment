const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');

function mergeIntervals(intervals) {
  const sorted = [...intervals].sort((a, b) => a.start - b.start);
  const merged = [];
  let current = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].start <= current.end) {
      current.end = Math.max(current.end, sorted[i].end);
    } else {
      merged.push(current);
      current = sorted[i];
    }
  }
  merged.push(current);
  return merged;
}

router.post('/save', async (req, res) => {
  const { userId, videoId, watchedIntervals, lastWatchedPosition } = req.body;

  let progress = await Progress.findOne({ userId, videoId });
  if (!progress) {
    progress = new Progress({ userId, videoId, watchedIntervals, lastWatchedPosition });
  } else {
    const merged = mergeIntervals([...progress.watchedIntervals, ...watchedIntervals]);
    progress.watchedIntervals = merged;
    progress.lastWatchedPosition = lastWatchedPosition;
  }
  await progress.save();
  res.send(progress);
});

router.get('/:userId/:videoId', async (req, res) => {
  const { userId, videoId } = req.params;
  const progress = await Progress.findOne({ userId, videoId });
  res.send(progress);
});

module.exports = router;