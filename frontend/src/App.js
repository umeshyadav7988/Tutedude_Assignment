// src/App.js
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";

const USER_ID = "user123"; 
const VIDEO_ID = "video123";

const App = () => {
  const videoRef = useRef(null);
  const [watchedIntervals, setWatchedIntervals] = useState([]);
  const [lastSavedTime, setLastSavedTime] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  const backendUrl = "http://localhost:5000/api/progress";

  useEffect(() => {
    axios
      .get(`${backendUrl}/${USER_ID}/${VIDEO_ID}`)
      .then((res) => {
        setWatchedIntervals(res.data.watchedIntervals || []);
        setLastSavedTime(res.data.lastWatchedPosition || 0);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = lastSavedTime;
    }
  }, [lastSavedTime]);

  const mergeIntervals = (intervals) => {
    if (!intervals.length) return [];
    const sorted = [...intervals].sort((a, b) => a.start - b.start);
    const merged = [sorted[0]];

    for (let i = 1; i < sorted.length; i++) {
      const prev = merged[merged.length - 1];
      const current = sorted[i];
      if (current.start <= prev.end) {
        prev.end = Math.max(prev.end, current.end);
      } else {
        merged.push(current);
      }
    }
    return merged;
  };

  const calculateProgress = (intervals, duration) => {
    const merged = mergeIntervals(intervals);
    const watchedSeconds = merged.reduce(
      (acc, { start, end }) => acc + (end - start),
      0
    );
    return Math.min(((watchedSeconds / duration) * 100).toFixed(2), 100);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    const currentTime = video.currentTime;
    const interval = 1;
  
    if (!video.duration) return; // Duration not ready
  
    const newInterval = { start: currentTime - interval, end: currentTime };
    const updatedIntervals = mergeIntervals([...watchedIntervals, newInterval]);
  
    const percent = calculateProgress(updatedIntervals, video.duration);
    setWatchedIntervals(updatedIntervals);
    setProgressPercent(percent);
  };
  

  const handlePause = () => {
    const video = videoRef.current;
    const currentTime = video.currentTime;
    const updated = mergeIntervals([
      ...watchedIntervals,
      { start: currentTime - 1, end: currentTime },
    ]);
    setWatchedIntervals(updated);
    setLastSavedTime(currentTime);

    axios
      .post(backendUrl, {
        userId: USER_ID,
        videoId: VIDEO_ID,
        watchedIntervals: updated,
        lastWatchedPosition: currentTime,
      })
      .catch((err) => console.error("Save error:", err));
  };

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/progress/defaultUser/video1`);
        if (res.data) {
          setWatchedIntervals(res.data.watchedIntervals || []);
          setLastSavedTime(res.data.lastWatchedTime || 0);
          setProgressPercent(res.data.progressPercent || 0);
        }
      } catch (err) {
        console.error('Error loading progress', err);
      }
    };
    fetchProgress();
  }, []);
  

  return (
    <div className="App" style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>📺 Lecture Video</h2>

      <video
        ref={videoRef}
        width="640"
        controls
        onTimeUpdate={handleTimeUpdate}
        onPause={handlePause}
        onLoadedMetadata={() => {
          const video = videoRef.current;
          if (video && lastSavedTime) {
            video.currentTime = lastSavedTime;
          }
        }}
        
      >
        <source src="/sample-5s.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={{ marginTop: "10px" }}>
        <strong>Progress:</strong> {progressPercent}%
      </div>

      <div
        style={{
          marginTop: "5px",
          height: "10px",
          width: "640px",
          background: "#ccc",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPercent}%`,
            background: "#4caf50",
            borderRadius: "4px",
            transition: "width 0.3s ease",
          }}
        ></div>
      </div>
    </div>
  );
};

export default App;
