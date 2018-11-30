const express = require('express');
const db = require('../database');
const router = express.Router();

router.post('/', async function (req, res) {
	const subscription = req.body.subscription;

	await db.insert('Subscriptions',
		['donorId', 'ngoId'],
		`donorId = '${subscription.donorId}' AND ngoId = '${subscription.ngoId}'`);
	res.status(200);
});

module.exports = router;
