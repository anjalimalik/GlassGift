const express = require('express');
const bcrypt = require("bcrypt");
const uuidv4 = require('uuid/v4');
const json2csv = require("json2csv");
const donorRepository = require('../database/donor');
const userRepository = require('../database/user');
const donationRepository = require('../database/donations');
const {sendConfirmationEmail} = require('../email');

const router = express.Router();

router.post('/', async function (req, res) {
    const donor = req.body;
    const hash = bcrypt.hashSync(req.body.password, 10);
    const emailId = uuidv4();
    const emailConfirmation = `http://localhost:8080/confirmEmail?token=${emailId}`;

    let users = await userRepository.getByEmail(donor.email);
    if (users.length !== 0) return res.status(500).json({error: 'Already exists'});

    await donorRepository.create(donor.email, hash, donor.name, donor.location, emailId, donor.age, donor.gender);
    sendConfirmationEmail(donor.email, donor.name, emailConfirmation, 1);
    res.sendStatus(200);
});

router.put('/', async function (req, res) {
    const changes = req.body;

    // const id_req = `id = ${changes.values.id}`;
    // const rows = await db.get("Donor", ["id"], `id = ${changes.id}`);
    // if (rows.length === 0) {
    //     res.status(500).send(`No Donor with id ${changes.id} found`);
    // } else {
    //
    // 	res.status(200);
    // }
});

router.post('/payment_method', async function (req, res) {
    const paymentMethod = req.body.paymentMethod;
    await donorRepository.addPaymentInfo(paymentMethod.userId, paymentMethod.address, paymentMethod.ccNumber,
        paymentMethod.cvv, paymentMethod.expirationDate, paymentMethod.ccNumber);
    res.sendStatus(200);
});

router.post('/search', async function (req, res) {
    let dbResult = await donorRepository.search(req.body.keyword);
    return res.status(200).json(dbResult);
});

router.get('/export_transactions', async function (req, res) {
    const donations = donationRepository.getByDonor(req.query['id']);
    const csv = json2csv.parse(donations);
    res.setHeader('Content-disposition', 'attachment; filename=donor-transactions.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csv);
});

module.exports = router;
