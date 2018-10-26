const express = require('express');
const db = require('../database');
const router = express.Router();

router.post('/', async function (req, res) {
	const donation = req.body.donation;

	let query = `SELECT minLimit, maxLimit FROM NGO WHERE id = '${donation.ngoId}'`;
	const results = await db.pool.query(query);

	if (donation.amount > results.maxLimit || donation.amount < results.minLimit) {
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
	// insert in DB for record?
});

module.exports = router;