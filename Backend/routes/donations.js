const express = require('express');
const db = require('../database');
const router = express.Router();

router.post('/', async function (req, res) {
	const donation = req.body;

	await db.insert('Donation',
		['donorId', 'ngoId', 'anonymity', 'message', 'donationType', 'honoredUserId', 'honoredUserName', 'date'],
		[donation.donorId, donation.ngoId, donation.anonymity, donation.message, donation.donationType,
			donation.honoredUserId, donation.honoredUserName, donation.date]);
	res.status(200);
});

module.exports = router;