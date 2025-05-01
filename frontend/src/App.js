// --- App.js ---
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const VIDEO_DURATION = 120; // seconds, hardcoded for demo
const USER_ID = 'user123';
const VIDEO_ID = 'videoABC';

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

function calculateProgress(intervals) {
  const merged = mergeIntervals(intervals);
  const totalWatched = merged.reduce((sum, i) => sum + (i.end - i.start), 0);
  return ((totalWatched / VIDEO_DURATION) * 100).toFixed(2);
}

function App() {
  const videoRef = useRef();
  const [watched, setWatched] = useState([]);
  const [lastSavedTime, setLastSavedTime] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/progress/${USER_ID}/${VIDEO_ID}`)
      .then(res => {
        if (res.data) {
          setWatched(res.data.watchedIntervals);
          setLastSavedTime(res.data.lastWatchedPosition || 0);
        }
      });
  }, []);

  const handleTimeUpdate = () => {
    const currentTime = Math.floor(videoRef.current.currentTime);
    const newInterval = { start: currentTime, end: currentTime + 1 };
    setWatched(prev => mergeIntervals([...prev, newInterval]));
  };

  const handlePause = () => {
    const currentTime = Math.floor(videoRef.current.currentTime);
    const data = {
      userId: USER_ID,
      videoId: VIDEO_ID,
      watchedIntervals: watched,
      lastWatchedPosition: currentTime
    };
    axios.post('http://localhost:5000/api/progress/save', data)
      .then(res => {
        setProgress(calculateProgress(res.data.watchedIntervals));
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Lecture Video</h2>
      <video
        ref={videoRef}
        width="600"
        controls
        onTimeUpdate={handleTimeUpdate}
        onPause={handlePause}
        onLoadedMetadata={() => {
          videoRef.current.currentTime = lastSavedTime;
        }}
      >
       <source src="http://techslides.com/demos/sample-videos/small.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>Progress: {progress}%</p>
    </div>
  );
}

export default App;