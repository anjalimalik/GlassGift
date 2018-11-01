const express = require('express');
const db = require('../database');
const uuidv4 = require('uuid/v4');
const stripe = require('stripe')('sk_test_qQerTxPScIJqfK5Cx30E5U5O');
const router = express.Router();
const {sendDonationConfirmationEmail} = require('../email');

router.post('/', async function (req, res) {
	const donation = req.body.donation;
	const limits = await db.get('NGO', ['minLimit', 'maxLimit'], `id = '${donation.ngoId}'`);

	if ((limits.maxLimit && donation.amount > limits.maxLimit) ||
		(limits.minLimit && donation.amount < limits.minLimit)) {
		return res.status(500).json({error: "Outside range"});
	}

    const donorId = req.get('Authorization');
    const donId = uuidv4();

	await db.insert('Donation',
		['id', 'donorId', 'ngoId', 'anonymous', 'message', 'type', 'honoredUserId', 'honoredUserName', 'created'],
		[donId, donorId, donation.ngoId, donation.anonymity || false, donation.message || "", donation.donationType || 0,
			donation.honoredUserId || 0, donation.honoredUserName || "", donation.date || "now()"]);
//	res.status(200);
  
//     try{
//     	const donation = req.body;

         let emailWrapper = await db.get('GGUser', 'email', `id = ${donorId}`);
         if(emailWrapper.rows.length === 0) throw new Error(`User with id ${donorId} not found`);

         let donorEmail = emailWrapper.rows[0].email;

//         console.log(donorEmail);

//     	let query = `INSERT INTO Donation(id, donorid, ngoid, anon, message, type, honorid, honorname, created, amount) VALUES`
//     			+` ('${donId}','${donorId}', '${donation.ngoId}', '${donation.anon}', '${donation.message}', `
//     			+`'${donation.type}', '${donation.honorid}', '${donation.honorname}', 'now()',`
//     			+` '${donation.amount}')`;
//         await db.pool.query(query);


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

         let stringAmount = (donation.amount/100) + "." 
                + (donation.amount%100 < 10? `0${donation.amount%100}`: donation.amount%100);

         sendDonationConfirmationEmail(donorEmail, stringAmount, donation.ngoName, donation.date, donId);

     	return res.sendStatus(200);
//     }catch (error) {
//         console.log(error);
//         return res.status(500).json({ error: error.message });
//     }
});

router.post('/scheduled', async function(req, res) {
	const donation = req.body.donation;
	// use stripe api to schedule

	const donationId = uuidv4();
    await db.insert('Donation',
        ['id', 'donorId', 'ngoId', 'anonymous', 'message', 'donationType', 'honoredUserId', 'honoredUserName', 'created'],
        [donationId, donation.donorId, donation.ngoId, donation.anonymity || false, donation.message || "", donation.donationType || 0,
            donation.honoredUserId || 0, donation.honoredUserName || "", donation.date || `to_timestamp(${Date.now() / 1000})`]);
    await db.insert('RecurringDonation',
		['id', 'donationId', 'updated', 'frequency'],
		[uuidv4(), donationId, new Date().toString(), donation.frequency]);

    res.sendStatus(500);
});

module.exports = router;