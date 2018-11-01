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

    let emailWrapper = await db.get('GGUser', ['email'] , `id = '${donorId}'`);
    if(emailWrapper.length === 0) throw new Error(`User with id ${donorId} not found`);

    let donorEmail = emailWrapper[0].email;

    let message = `Donation of \$${donation.amount} from donor: ${donorId} to ngo : ${donation.ngoId}`
                    +`\nMessage: '${donation.message}'`;


    const token = req.body.stripeToken;

    const charge = stripe.charges.create({
        amount: donation.amount,
        currency: donation.currency,
        description: message,
        source: token,
        metadata: {donation_id: donId}, 
        receipt_email: donorEmail 
     }, function(err, charge){
        if(charge == null) return res.status(500).json({ error: `Stripe Payment Failed` });
        return res.status(200).json(charge);
     });

    if(charge != null){
	   await db.insert('Donation',
		['id', 'donorId', 'ngoId', 'anonymous', 'message', 'type', 'honoredUserId', 'honoredUserName', 'created', 'amount'],
		[donId, donorId, donation.ngoId, donation.anonymity || false, donation.message || "", donation.donationType || 0,
			donation.honoredUserId || 0, donation.honoredUserName || "", donation.date || "now()", donation.amount || 0]);

         
        let stringAmount = (donation.amount/100) + "." 
            + (donation.amount%100 < 10? `0${donation.amount%100}`: donation.amount%100);

        sendDonationConfirmationEmail(donorEmail, stringAmount, donation.ngoName, donation.date, donId);
    }
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

        console.log(donation);
        
        let ngoSearch = await db.get('GGUser', ['email'], `id = '${donation.ngoid}'`);
        if(ngoSearch.length === 0) throw new Error(`Ngo with id ${donation.ngoid} not found`);

        let donorSearch = await db.get('GGUser', ['email'], `id = '${donation.donorid}'`);
        if(donorSearch.length === 0) throw new Error(`Donor with id ${donation.donorid} not found`);

        sendReceiptEmail(donation, ngoSearch[0].email, donorSearch[0].email);

        return res.sendStatus(200);
    }catch(error){
        console.log(error);
        return res.status(500).json({ error: error.message });
    }

});

module.exports = router;