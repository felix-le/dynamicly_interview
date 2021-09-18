const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/index');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8888;
app.use('/api', routes);
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

// Get videos
app.use(express.static('public'));
app.use('/videos', express.static(__dirname + '/videos'));

// Connect to mongoDB
const URI = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.log(err.message);
    // Exit process with failure
    process.exit(1);
  }
};
connectDB();
