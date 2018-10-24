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

        const donorId = req.get('Authorization');

        let query0 = `SELECT email FROM GGUser WHERE id = '${donorId}'`;

        const emailWrapper = await db.pool.query(query0);
        if(emailWrapper.rows.length === 0) throw new Error(`User with id ${donorId} not found`);

        let donorEmail = emailWrapper.rows[0].email;

        console.log(donorEmail);

    	let query = `INSERT INTO Donation(id, donorid, ngoid, anon, message, type, honorid, honorname, created, amount) VALUES`
    			+` ('${donId}','${donorId}', '${donation.ngoId}', '${donation.anon}', '${donation.message}', `
    			+`'${donation.type}', '${donation.honorid}', '${donation.honorname}', 'now()',`
    			+` '${donation.amount}')`;
        await db.pool.query(query);


        let message = `Donation of \$${donation.amount} from donor: ${donorId} to ngo : ${donation.ngoId}`
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
        	receipt_email: donorEmail, 
        });

        sendDonationConfirmationEmail(donorEmail, donation.amount, donation.ngoName, donation.date, donId);

    	return res.sendStatus(200);
    }catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;