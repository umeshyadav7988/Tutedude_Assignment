// --- server.js ---
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const progressRoutes = require('./routes/progress');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/videoProgress', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/progress', progressRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});