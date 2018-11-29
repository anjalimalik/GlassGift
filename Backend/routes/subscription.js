const express = require('express');
const 
const db = require('../database');
const router = express.Router();

router.post('/', async function (req, res) {
	const subscription = req.body.subscription;

	await db.insert('Subscriptions',
		['donorId', 'ngoId'],
		`donorId = '${subscription.donorId}' AND ngoId = '${subscription.ngoId}'`);
	res.status(200);
});

router.get('/', async function(req, res) {
	const ngoId = req.get("Authorization");

	let database = await db.get("Subscriptions", 
		['*'],
		)
})

module.exports = router;
