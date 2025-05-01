# 🎓 Real Video Progress Tracker

Track real video-watching progress in online learning platforms. Instead of just checking if a video is "completed," this tool tracks the **unique** parts of the video a user has watched — preventing fake progress from skipping or rewatching.

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
- 📊 **Progress bar** and **percentage display**

---

## 🧠 Tech Stack (MERN)

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | React.js, Axios         |
| Backend   | Node.js, Express.js     |
| Database  | MongoDB (Mongoose)      |

---

## 🚀 Getting Started

### 📁 Clone the Repository

```bash
git clone https://github.com/umeshyadav7988/video-progress-tracker.git
cd video-progress-tracker
```

---

### 📦 Backend Setup

```bash
cd backend
npm install
npm start
```

Make sure your MongoDB URI is set in `backend/.env`:

```env
MONGO_URI=
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

## 🔧 How It Works

1. The user watches a video.
2. The app tracks and merges watched intervals (e.g., [0–10], [12–20]).
3. Skipping or repeating doesn’t affect progress.
4. Progress is calculated as:

   ```
   Unique seconds watched / Total duration × 100
   ```

5. Data is persisted in MongoDB and auto-loaded when the user returns.

---

## 📷 UI Preview

| Video Player With Progress | Resume Playback |
|----------------------------|-----------------|
(![Screenshot (489)](https://github.com/user-attachments/assets/2d8714ea-c2e0-4757-8994-3c2d6d534454)


---

## 🛠️ Future Improvements

- 🔐 User authentication (JWT)
- 📈 Visual timeline of watched segments
- 📚 Support for multiple videos/courses
- 🎯 Quiz integration after completion

---

## 📫 Contact

If you have any questions:

- GitHub: [@umeshyadav7988](https://github.com/umeshyadav7988)
- Email: [umeshyadav7988@gmail.com] <!-- Replace if needed -->

---

## 📄 License

MIT © Umesh RAO
```
