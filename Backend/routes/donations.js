const express = require('express');
const db = require('../database');
const uuidv4 = require('uuid/v4');
const router = express.Router();

router.post('/', async function (req, res) {
	const donation = req.body.donation;
	const limits = await db.get('NGO', ['minLimit', 'maxLimit'], `id = '${donation.ngoId}'`);

	if ((limits.maxLimit && donation.amount > limits.maxLimit) ||
		(limits.minLimit && donation.amount < limits.minLimit)) {
		return res.status(500).json({error: "Outside range"});
	}

	await db.insert('Donation',
		['donorId', 'ngoId', 'anonymity', 'message', 'donationType', 'honoredUserId', 'honoredUserName', 'date'],
		[donation.donorId, donation.ngoId, donation.anonymity, donation.message, donation.donationType,
			donation.honoredUserId, donation.honoredUserName, donation.date]);
	res.status(200);
});

router.post('/scheduled', async function(req, res) {
	const donation = req.body.donation;
	// use stripe api to schedule

    await db.insert('Donation',
        ['donorId', 'ngoId', 'anonymity', 'message', 'donationType', 'honoredUserId', 'honoredUserName', 'date'],
        [donation.donorId, donation.ngoId, donation.anonymity, donation.message, donation.donationType,
            donation.honoredUserId, donation.honoredUserName, donation.date]);
    await db.insert('RecurringDonation',
		['id', 'donationId', 'updated', 'frequency'],
		[uuidv4(), ])
});

module.exports = router;