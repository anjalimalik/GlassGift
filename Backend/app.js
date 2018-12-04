const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const CronJob = require('cron').CronJob;
const stripe = require('stripe')('sk_test_qQerTxPScIJqfK5Cx30E5U5O');
const uuidv4 = require('uuid/v4');



const indexRouter = require('./routes/');
const donorRouter = require('./routes/donor');
const donationRouter = require('./routes/donations');
const ngoRouter = require('./routes/ngo');
const subscriptionRouter = require('./routes/subscription');

const db = require('./database');
const auth = require('./auth');

require('dotenv').config();
const app = express();
db.init();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
// app.use(auth.checkAuthToken);

app.use('/', indexRouter);
app.use('/donor', donorRouter);
app.use('/ngo', ngoRouter);
app.use('/donation', donationRouter);
app.use('/subscription', subscriptionRouter);

const job = new CronJob('0 */1 * * * *', async function() {
  const dbResult = await db.pool.query(`select * from recurringdonation inner join donation on recurringdonation.donationId = donation.id inner join paymentinfo on donation.donorId = paymentinfo.userId`);
  dbResult.rows.forEach(async function(row) {
    if (row.frequency == 1) {
      const donId = uuidv4();
      console.log(`Recurring charge for donorId: ${row.donorid}`);
      const charge = await stripe.charges.create({
        amount: row.amount,
        currency: 'usd',
        description: row.message,
        customer: row.stripecustomerid,
        metadata: { donation_id: donId },
       });
    }
  });
});
job.start();

module.exports = app;
