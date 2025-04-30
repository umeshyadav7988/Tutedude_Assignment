const express = require('express');
const router = express.Router();
const UserProgress = require('../models/UserProgress');
const mergeIntervals = require('../utils/mergeIntervals');

router.get('/:userId', async (req, res) => {
  const progress = await UserProgress.findOne({ userId: req.params.userId });
  res.json(progress || { lastPosition: 0, intervals: [], progress: 0 });
});

router.post('/update', async (req, res) => {
  const { userId, currentTime } = req.body;
  let userData = await UserProgress.findOne({ userId });

  if (!userData) {
    userData = new UserProgress({
      userId,
      videoId: 'default',
      lastPosition: currentTime,
      intervals: [[currentTime, currentTime + 1]],
      videoDuration: 600,
      progress: 0
    });
  } else {
    userData.intervals.push([currentTime, currentTime + 1]);
    userData.lastPosition = currentTime;
  }

  userData.intervals = mergeIntervals(userData.intervals);
  const uniqueSeconds = userData.intervals.reduce((acc, [start, end]) => acc + (end - start), 0);
  userData.progress = Math.floor((uniqueSeconds / userData.videoDuration) * 100);

  await userData.save();
  res.json({ intervals: userData.intervals, progress: userData.progress });
});

module.exports = router;
