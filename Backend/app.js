const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/');
const donorRouter = require('./routes/donor');
const donationRouter = require('./routes/donations');
const ngoRouter = require('./routes/ngo');
const donationRouter = require('./routes/donations');
const subscriptionRouter = require('./routes/subscription');

const db = require('./database');
const auth = require('./auth');

require('dotenv').config();
const app = express();
db.init();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(auth.checkAuthToken);

app.use('/', indexRouter);
app.use('/donor', donorRouter);
app.use('/ngo', ngoRouter);
app.use('/donation', donationRouter);
app.use('/subscription', subscriptionRouter);

module.exports = app;
