const express = require('express');
const db = require('../database');
const uuidv4 = require('uuid/v4');
const stripe = require('stripe')('sk_test_qQerTxPScIJqfK5Cx30E5U5O');
const datetime = require('node-datetime');
const jwt = require('jsonwebtoken');
const router = express.Router();
const {sendDonationConfirmationEmail, sendReceiptEmail, sendNGOThankYouEmail} = require('../email');


router.post('/', async function (req, res) {
	const donation = req.body;
	const limits = await db.get('NGO', ['minLimit', 'maxLimit', 'emailTemplate'], `id = '${donation.ngoId}'`);
    const ngoSearch = await db.get('GGUser', ['username'], `id = '${donation.ngoId}'`);
    let ngoName = ngoSearch[0].username;

    var dt = datetime.create();
    dt.format('m/d/Y');

	if ((limits[0].maxLimit && donation.amount / 100 > limits[0].maxlimit) ||
		(limits[0].minlimit && donation.amount / 100 < limits[0].minlimit)) {
		return res.status(500).json({error: "Outside range"});
	}

    const donId = uuidv4();
  
    const authorization = req.get('Authorization');
	if (!authorization) return res.status(500).json({error: 'No token supplied'});

    const decoded = jwt.verify(authorization, 'SECRETSECRETSECRET');
	const donorId = decoded.id;

    let emailWrapper = await db.get('GGUser', ['email', 'username'] , `id = '${donorId}'`);
    if(emailWrapper.length === 0) throw new Error(`User with id ${donorId} not found`);

    let donorEmail = emailWrapper[0].email;
    let donorName = emailWrapper[0].username;

	await db.insert('Donation',
		['id', 'donorId', 'ngoId', 'amount', 'anonymous', 'message', 'type', 'honoredUserId', 'honoredUserName', 'created'],
		[donId, donorId, donation.ngoId, donation.amount, donation.anonymity || false, donation.message || "", donation.donationType || 0,
			donation.honoredUserId || 0, donation.honoredUserName || "", donation.date || "now()"]);


	if (donation.recurring > 0)
		await db.pool.query(`INSERT INTO recurringdonation VALUES ('${donId}', now(), ${donation.recurring})`);

    let message = `Donation of \$${donation.amount} from donor: ${donorId} to ngo : ${donation.ngoId}`
   			  +`\nMessage: '${donation.message}'`;

 	const token = req.body.stripeToken;
	let customerId;

	dbResult = await db.pool.query(`SELECT stripeCustomerId FROM paymentinfo WHERE userId = '${donorId}'`);
	if (dbResult.rows.length === 1) {
		customerId = dbResult.rows[0].stripecustomerid;
	} else {
		const customer = await stripe.customers.create({
			source: token.id,
			email: donorEmail,
		});

		customerId = customer.id;

		await db.pool.query(`INSERT INTO paymentinfo VALUES ('${donorId}', '${customerId}')`);
	}


 	const charge = await stripe.charges.create({
   	amount: donation.amount,
	 	currency: 'usd',
	 	description: message,
	 	customer: customerId,
	 	metadata: { donation_id: donId },
    });

    let stringAmount = (donation.amount/100) + "." + (donation.amount%100 < 10? `0${donation.amount%100}`: donation.amount%100);

    sendDonationConfirmationEmail(donorEmail, stringAmount, donation.ngoName, (donation.date || new Date(dt.now())), donId);

    if(limits[0].emailtemplate){
       sendNGOThankYouEmail(donorEmail, limits[0].emailtemplate, donorName, ngoName);
    }

 	 return res.status(200).json({
		 id: donId.id,
		 donorEmail,
		 ngoId: donation.ngoId,
		 ngoName: ngoName[0].username,
		 amount: charge.amount,
		 created: charge.created,
		 description: charge.description,
		 metadata: charge.metadata,
		 status: charge.status,
	 });
});

router.get('/prev', async function(req, res) {
	const authorization = req.get('Authorization');
	if (!authorization) return res.status(500).json({error: 'No token supplied'});
	const decoded = jwt.verify(authorization, 'SECRETSECRETSECRET');
	const donorId = decoded.id;

	const donor = await db.pool.query(`SELECT * FROM paymentinfo WHERE userId = '${donorId}'`);
	if (donor.rows.length > 0) return res.sendStatus(200);
	return res.sendStatus(500);
});

router.post('/scheduled', async function(req, res) {
	const donation = req.body.donation;
	// use stripe api to schedule

	const donationId = uuidv4();
    await db.insert('Donation',
        ['id', 'donorId', 'ngoId', 'anonymous', 'message', 'donationType', 'honoredUserId', 'honoredUserName', 'created'],
        [donationId, donation.donorId, donation.ngoId, donation.anonymity || false, donation.message || "", donation.donationType || 0,
            donation.honoredUserId || 0, donation.honoredUserName || "", donation.date || `to_timestamp(${Date.now() / 1000})`]);
    await db.insert('RecurringDonation',
		['id', 'donationId', 'updated', 'frequency'],
		[uuidv4(), donationId, new Date().toString(), donation.frequency]);

    res.sendStatus(500);
});

router.post('/email', async function(req, res) {
	const donationID = req.body.id;

	const dbResult = await db.pool.query(`select gguser_donor.email, donation.amount, gguser_ngo.username, donation.created from donation inner join ngo on donation.ngoId = ngo.id inner join donor on donation.donorId = donor.id inner join gguser as gguser_donor on donor.id = gguser_donor.id inner join gguser as gguser_ngo on ngo.id = gguser_ngo.id where donation.id = '${donationID}'`);
	if (dbResult.rows.length !== 1) return res.status(500).json({error: "Donation doesn't exist"});

	await sendDonationReceiptEmail(dbResult.rows[0].email, dbResult.rows[0].amount, dbResult.rows[0].username, dbResult.rows[0].created);

	res.sendStatus(200);
})

module.exports = router;
