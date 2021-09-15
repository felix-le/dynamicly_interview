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

// Connect to mongoDB
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  async (err) => {
    if (err) throw err;
    console.log('Connected to MongoDB');
  }
);
