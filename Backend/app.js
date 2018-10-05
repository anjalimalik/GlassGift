const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/');
const donorRouter = require('./routes/donor');
const ngoRouter = require('./routes/ngo');

const {ipFilter, error, fourOhFour} = require('./middleware');
const db = require('./database');

require('dotenv').config();
const app = express();
db.init();

app.use(logger('dev'));
app.use(express.json());

app.use('/', indexRouter);
app.use('/donor', donorRouter);
app.use('/ngo', ngoRouter);

// app.use(ipFilter);
app.use(error);
app.use(fourOhFour);

module.exports = app;
