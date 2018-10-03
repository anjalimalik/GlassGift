const express = require('express');
const db = require('../database');
const router = express.Router();

router.post('/', async function (req, res) {
	const subscription = req.body;
	db.insert('Subscriptions',
		['donorId', 'ngoId'],
		[subscription.donorId, subscription.ngoId]);
	res.status(200);
});

module.exports = router;
