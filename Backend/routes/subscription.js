const express = require('express');
const subscriptionRepository = require('../database/subscriptions');
const db = require('../database');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/', async function (req, res) {
	const donorId = jwt.verify(req.get('Authorization'), 'SECRETSECRETSECRET').id;
	const subscription = req.body.subscription;
	let check = await db.get('Subscriptions', ['*'], `donorId = '${donorId}' AND ngoId = '${subscription.ngoId}'`);
	if(check.length > 0){
		return res.status(500).send("Donor already subscribed to this ngo");
	}
	await subscriptionRepository.create(donorId, subscription.ngoId);
	return res.sendStatus(200);
});

module.exports = router;
