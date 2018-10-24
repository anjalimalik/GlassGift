const express = require('express');
const db = require('../database');
var stripe = require('stripe')('sk_test_qQerTxPScIJqfK5Cx30E5U5O');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const {sendDonationConfirmationEmail} = require('../email');

router.post('/', async function (req, res) {
    try{
    	const donation = req.body;

    	const donId = uuidv4();


    	let query = `INSERT INTO Donation(id, donorid, ngoid, anon, message, type, honorid, honorname, created, amount) VALUES`
    			+` ('${donId}','${donation.donorId}', '${donation.ngoId}', '${donation.anon}', '${donation.message}', `
    			+`'${donation.type}', '${donation.honorid}', '${donation.honorname}', 'now()',`
    			+` '${donation.amount}')`;
        await db.pool.query(query);


        let message = `Donation of \$${donation.amount} from donor: ${donation.donorId} to ngo : ${donation.ngoId}`
        			  +`\nMessage: '${donation.message}'`;

        // let innerJoinQuery = `SELECT * FROM GGUser WHERE id = '${donation.donorId}'`;

        // let dbResult = await db.pool.query(innerJoinQuery);

        // let innerJoinQuery2 = `SELECT * FROM GGUser WHERE id = '${donation.ngoId}'`;

        // let dbResult2 = await db.pool.query(innerJoinQuery2);

        const token = req.body.stripeToken;

        const charge = stripe.charges.create({
        	amount: donation.amount,
        	currency: donation.currency,
        	description: message,
        	source: token,
        	metadata: {donation_id: donId}, 
        	receipt_email: donation.donorEmail, 
        });

        sendDonationConfirmationEmail(donation.donorEmail, donation.amount, donation.ngoName, donation.date, donId);

    	return res.sendStatus(200);
    }catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;