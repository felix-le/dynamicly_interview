const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

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
