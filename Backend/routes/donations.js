const express = require('express');
const db = require('../database');
const uuidv4 = require('uuid/v4');
const stripe = require('stripe');
const router = express.Router();

router.post('/', async function (req, res) {
	const donation = req.body.donation;
	const limits = await db.get('NGO', ['minLimit', 'maxLimit'], `id = '${donation.ngoId}'`);

	if ((limits.maxLimit && donation.amount > limits.maxLimit) ||
		(limits.minLimit && donation.amount < limits.minLimit)) {
		return res.status(500).json({error: "Outside range"});
	}

	await db.insert('Donation',
		['id', 'donorId', 'ngoId', 'anonymous', 'message', 'type', 'honoredUserId', 'honoredUserName', 'created'],
		[uuidv4(), donation.donorId, donation.ngoId, donation.anonymity || false, donation.message || "", donation.donationType || 0,
			donation.honoredUserId || 0, donation.honoredUserName || "", donation.date || "now()"]);
	res.status(200);
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

module.exports = router;