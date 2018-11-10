const express = require('express');
const ngoRepository = require('../database/ngo');
const userRepository = require('../database/user');
const donationRepository = require('../database/donations');
const uuidv4 = require('uuid/v4');
const stripe = require('stripe')('sk_test_qQerTxPScIJqfK5Cx30E5U5O');
const router = express.Router();
const {sendDonationConfirmationEmail, sendReceiptEmail} = require('../email');

router.post('/', async function (req, res) {
    const donation = req.body;
    const limits = await ngoRepository.getLimitsById(donation.ngoId);

    if ((limits.maxLimit && donation.amount > limits.maxLimit) ||
        (limits.minLimit && donation.amount < limits.minLimit)) {
        return res.status(500).json({error: "Outside range"});
    }

    const donorId = req.get('Authorization');
    const donationId = uuidv4();

    let emailWrapper = await userRepository.getEmailsFromId(donorId);
    if (emailWrapper.length === 0) throw new Error(`User with id ${donorId} not found`);

    let donorEmail = emailWrapper[0].email;
    let message = `Donation of $${donation.amount} from donor: ${donorId} to ngo : ${donation.ngoId}\n` +
                  `Message: '${donation.message}'`;
    const token = req.body.stripeToken;
    const charge = stripe.charges.create({
        amount: donation.amount,
        currency: donation.currency,
        description: message,
        source: token,
        metadata: {
            donation_id: donationId,
            honoredUser: donation.honoredUserName
        },
        receipt_email: donorEmail
    }, function (err, charge) {
        if (charge == null) return res.status(500).json({error: `Stripe Payment Failed`});
        return res.status(200).json(charge);
    });

    if (charge != null) {
        await donationRepository.create(donationId, donorId, donation.ngoId, donation.anonymity, donation.message,
            donation.donationType, donation.honoredUserId, donation.honoredUserName, donation.date, donation.amount);

        let stringAmount = (donation.amount / 100) + "."
            + (donation.amount % 100 < 10 ? `0${donation.amount % 100}` : donation.amount % 100);

        sendDonationConfirmationEmail(donorEmail, stringAmount, donation.ngoName, donation.date, donationId);
    }
});

router.get('/', async function (req, res) {
    if (req.query['by'] === 'user') {

    } else if (req.query['by'] === 'ngo') {

    } else {
        res.status(500).send({error: 'Invalid filter'});
    }
});

router.post('/scheduled', async function (req, res) {
    const donation = req.body.donation;
    const donationId = uuidv4();

    setInterval(async () => {
        await donationRepository.create(donationId, donation.donorId, donation.ngoId, donation.anonymity, donation.message,
            donation.donationType, donation.honoredUserId, donation.honoredUserName, donation.date, donation.amount);
    }, donation.frequency);

    await donationRepository.createScheduled(donationId, donation.frequency);

    res.sendStatus(500);
});

router.post('/emailReceipt', async function (req, res) {
    const donationId = req.body.donationId;
    let donationData = await donationRepository.getById(donationId);
    if (donationData.length === 0) return res.status(500).json({error: `Donation with id ${donationId} not found`});
    let donation = donationData[0];

    let ngoSearch = await userRepository.getEmailsFromId(donation.ngoId);
    if (ngoSearch.length === 0) return res.status(500).json({error: `Ngo with id ${donation.ngoId} not found`});

    let donorSearch = await userRepository.getEmailsFromId(donation.donorId);
    if (donorSearch.length === 0) return res.status(500).json({error: `Donor with id ${donation.donorId} not found`});

    sendReceiptEmail(donation, ngoSearch[0].email, donorSearch[0].email);
    return res.sendStatus(200);
});

module.exports = router;