const express = require('express');
const db = require('../database');
const uuidv4 = require('uuid/v4');
const stripe = require('stripe')('sk_test_qQerTxPScIJqfK5Cx30E5U5O');
const router = express.Router();
const {sendDonationConfirmationEmail, sendReceiptEmail} = require('../email');

router.post('/', async function (req, res) {
	const donation = req.body;
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

         let emailWrapper = await db.get('GGUser', ['email'] , `id = '${donorId}'`);
         if(emailWrapper.length === 0) throw new Error(`User with id ${donorId} not found`);

         let donorEmail = emailWrapper[0].email;

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
         }, function(err, charge){
            return res.status(200).json(charge);
         });

         let stringAmount = (donation.amount/100) + "." 
                + (donation.amount%100 < 10? `0${donation.amount%100}`: donation.amount%100);

         sendDonationConfirmationEmail(donorEmail, stringAmount, donation.ngoName, donation.date, donId);
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

router.post('/emailReceipt', async function(req, res) {
    try{
        const donId = req.body.donId;

        let donData = await db.get('Donation', ['*'], `id = '${donId}'`);
        if(donData.length === 0) throw new Error(`Donation with id ${donId} not found`);

        let donation = donData[0];
        
        let ngoSearch = await db.get('GGUser', ['email'], `id = ${donation.ngoId}`);
        if(ngoSearch.length === 0) throw new Error(`Ngo with id ${donation.ngoId} not found`);

        let donorSearch = await db.get('GGUser', ['email'], `id = ${donation.donorId}`);
        if(donorSearch.length === 0) throw new Error(`Donor with id ${donation.donorId} not found`);

        sendReceiptEmail(donation, ngoSearch[0].email, donorSearch[0].email);

        return res.sendStatus(200);
    }catch(err){
        console.log(err);
        return res.status(500).json({ error: error.message });
    }

});

module.exports = router;