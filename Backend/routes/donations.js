const express = require('express');
const ngoRepository = require('../database/ngo');
const userRepository = require('../database/user');
const donationRepository = require('../database/donations');
const db = require('../database/');
const uuidv4 = require('uuid/v4');
const stripe = require('stripe')('sk_test_qQerTxPScIJqfK5Cx30E5U5O');
const datetime = require('node-datetime');
const jwt = require('jsonwebtoken');
const router = express.Router();
const {sendDonationConfirmationEmail, sendReceiptEmail, sendNGOThankYouEmail} = require('../email');


router.post('/', async function (req, res) {
    const donorId = jwt.verify(req.get('Authorization'), 'SECRETSECRETSECRET').id;
    const donation = req.body;
    const limits = await ngoRepository.getLimitsById(donation.ngoId);
    const ngoSearch = await db.get('GGUser', ['username'], `id = '${donation.ngoId}'`);
    const ngoEmailTemplate = await db.get('NGO', ['emailTemplate'], `id = '${donation.ngoId}'`);
    let ngoName = ngoSearch[0].username;

    var dt = datetime.create();
    dt.format('m/d/Y');

    if ((limits.maxLimit && donation.amount / 100 > limits.maxLimit) ||
        (limits.minLimit && donation.amount / 100 < limits.minLimit)) {
        return res.status(500).json({error: "Outside range"});
    }

    let emailWrapper = await userRepository.getEmailsFromId(donorId);
    if (emailWrapper.length === 0) throw new Error(`User with id ${donorId} not found`);
    let donorEmail = emailWrapper[0].email;
    let nameWrapper = await db.get('GGUser', ['username'], `id = '${donorId}'`);
    let donorName = nameWrapper[0].username;

    let donationId = uuidv4();

    let message = `Donation of $${donation.amount} from donor: ${donorId} to ngo : ${donation.ngoId}\n` +
        `Message: '${donation.message}'`;

    const token = req.body.stripeToken;
    const charge = stripe.charges.create({
        amount: donation.amount,
        currency: 'usd',
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
        await donationRepository.create(donationId, donorId, donation.ngoId, donation.anon, donation.message,
            donation.donationType, donation.honoredUserId, donation.honoredUserName, donation.date, donation.amount);
    }

    if (ngoEmailTemplate[0].emailtemplate) {
        sendNGOThankYouEmail(donorEmail, ngoEmailTemplate[0].emailtemplate, donorName, ngoName);
    }

    let stringAmount = (donation.amount / 100) + "."
        + (donation.amount % 100 < 10 ? `0${donation.amount % 100}` : donation.amount % 100);

    sendDonationConfirmationEmail(donorEmail, stringAmount, ngoName, (donation.date | dt.now()), donationId);
});

router.get('/', async function (req, res) {
    if (req.query['by'] === 'donor') {
        const donations = await donationRepository.getByDonor(req.query['id']);
        res.status(200).json(donations);
    } else if (req.query['by'] === 'ngo') {
        const donations = await donationRepository.getByNgo(req.query['id']);
        res.status(200).json(donations);
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

    await sendReceiptEmail(donation, ngoSearch[0].email, donorSearch[0].email);
    return res.sendStatus(200);
});

router.post('/email', async function (req, res) {
    const donationID = req.body.id;

    let ngoSearch = await userRepository.getEmailsFromId(donation.ngoId);
    if (ngoSearch.length === 0) return res.status(500).json({error: `Ngo with id ${donation.ngoId} not found`});
    const dbResult = await db.pool.query(`select gguser_donor.email, donation.amount, gguser_ngo.username, donation.created from donation inner join ngo on donation.ngoId = ngo.id inner join donor on donation.donorId = donor.id inner join gguser as gguser_donor on donor.id = gguser_donor.id inner join gguser as gguser_ngo on ngo.id = gguser_ngo.id where donation.id = '${donationID}'`);
    if (dbResult.rows.length !== 1) return res.status(500).json({error: "Donation doesn't exist"});

    let donorSearch = await userRepository.getEmailsFromId(donation.donorId);
    if (donorSearch.length === 0) return res.status(500).json({error: `Donor with id ${donation.donorId} not found`});
    await sendDonationReceiptEmail(dbResult.rows[0].email, dbResult.rows[0].amount, dbResult.rows[0].username, dbResult.rows[0].created);

    res.sendStatus(200);
});

router.get('/prev', async function (req, res) {
    const donorId = jwt.verify(req.get('Authorization'), 'SECRETSECRETSECRET').id;

    const donor = await db.pool.query(`SELECT * FROM paymentinfo WHERE userId = '${donorId}'`);
    if (donor.rows.length > 0) return res.status(200).send(donor[0]);
    return res.sendStatus(500);
});

module.exports = router;