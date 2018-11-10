const express = require('express');
const subscriptionRepository = require('../database/subscriptions');
const router = express.Router();

router.post('/', async function (req, res) {
	const subscription = req.body.subscription;
	await subscriptionRepository.create(subscription.donorId, subscription.ngoId);
	res.status(200);
});

module.exports = router;
