# 🎓 Real Video Progress Tracker

Track real video-watching progress in online learning platforms. Instead of just checking if a video is "completed," this tool tracks the **unique** parts of the video a user has watched — preventing fake progress from skipping or rewatching.

---

## 🔗 Live Demo

🟢 [View Project on Vercel](https://tutedude-assignment-oqrolct73-umeshs-projects-defe119c.vercel.app)

📂 [GitHub Repository](https://github.com/umeshyadav7988/Tutedude_Assignment.git)

---

## 👨‍💻 Author

**Umesh Yadav**  
GitHub: [@umeshyadav7988](https://github.com/umeshyadav7988)

---

## 🌟 Features

- ✅ Tracks only **unique watched intervals**
- ⏩ Prevents progress when users **skip** ahead
- 🔄 Handles **rewatching** without inflating progress
- 💾 Saves progress with **MongoDB**
- ▶️ **Resumes playback** from last watched position
- 📊 Displays **progress bar** and **percentage**

---

## 🧠 Tech Stack (MERN)

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | React.js, Axios, HTML5 Video |
| Backend   | Node.js, Express.js     |
| Database  | MongoDB (Mongoose)      |

---

## 🚀 Getting Started

### 📁 Clone the Repository

```bash
git clone https://github.com/umeshyadav7988/Tutedude_Assignment.git
cd Tutedude_Assignment
```

---

### 📦 Backend Setup

```bash
cd backend
npm install
npm start
```

Set your MongoDB credentials in `backend/.env`:

```env
MONGO_URI=your_mongodb_connection
PORT=5000
```

---

### 💻 Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 📊 How It Works

### 📌 Tracking Intervals

- The app tracks each video segment the user watches using time events (`onTimeUpdate`, `onPause`).
- Each interval is stored in the format `[start, end]`.

## 💾 Backend API

### `POST /api/progress`
Save or update progress.

```json
{
  "userId": "user123",
  "videoId": "lecture456",
  "watchedIntervals": [[0, 10], [20, 30]],
  "lastWatchedTime": 30,
  "progressPercent": 33.33
}
```

### `GET /api/progress/:userId/:videoId`
Fetch previously saved progress and intervals.

---

## 📷 UI Preview

| Video Player With Progress |
|----------------------------|
![Screenshot (489)](https://github.com/user-attachments/assets/2d8714ea-c2e0-4757-8994-3c2d6d534454)

---

## 📄 Design Documentation

### 🔍 Watched Intervals

- Captured using `video.currentTime` on play, pause, and time changes.
- Stored as `[start, end]` arrays in MongoDB.

### 🔁 Merging Logic

- Before saving, intervals are merged to remove overlaps.
- Prevents repeated counting for the same segment.

### 📊 Progress Calculation

- Total unique watched time is divided by video duration.
- Rounded to 2 decimal places and capped at 100%.

### 🔐 Data Persistence

- Watched intervals, percentage progress, and last watched time are saved to the backend.
- On page load, this data is fetched to resume playback and show progress.

---

## 🛠️ Future Improvements

- 🔐 JWT-based User Authentication
- 🎯 Interactive timeline of watched segments
- 📚 Multiple course & video support
- 📝 Post-lecture quizzes and feedback

---

## 📫 Contact

Have questions or feedback?

- GitHub: [@umeshyadav7988](https://github.com/umeshyadav7988)
- Email: [umeshyadav7988@gmail.com](mailto:umeshyadav7988@gmail.com)

---

## 🧾 License

MIT © Umesh Yadav
```

