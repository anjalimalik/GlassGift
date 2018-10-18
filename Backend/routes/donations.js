const express = require('express');
const db = require('../database');
var stripe = require('stripe')('sk_test_qQerTxPScIJqfK5Cx30E5U5O');
const router = express.Router();

router.post('/', async function (req, res) {
	const donation = req.body;

	const id = uuidv4();

	let query = `INSERT INTO Donation(id, donorId, ngoId, anonymity, message, donationType, honoredUserId, honoredUserName, date, amount) VALUES`
			+` ('${id}','${donation.donorId}', '${donation.ngoId}', '${donation.anonymity}', '${donation.message}', `
			+`'${donation.donationType}', '${donation.honoredUserId}', '${donation.honoredUserName}', '${donation.date},`
			+` ${donation.amount}')`;
    await db.pool.query(query);


    let message = `Donation of \$${donation.amount} from donor: ${donation.donorId} to ngo : ${donation.ngoId}`
    			  +`\nMessage: '${donation.message}'`;

    let innerJoinQuery = 'SELECT Donor.id as id, name, email FROM GGUser INNER JOIN NGO ON GGUser.id = Donor.id'
    					 +` WHERE id = '${donation.donorId}'`;

    let dbResult = await db.pool.query(innerJoinQuery);

    const token = req.body.stripeToken;

    const charge = stripe.charges.create({
    	amount: donation.amount,
    	currency: donation.currency,
    	description: message,
    	source: token,
    	metadata: {donation_id: id}, 
    	receipt_email: dbResult.email, 
    });

	res.status(200);
});

module.exports = router;