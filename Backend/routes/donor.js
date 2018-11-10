const express = require('express');
const bcrypt = require("bcrypt");
const uuidv4 = require('uuid/v4');
const donorRepository = require('../database/donor');
const {sendConfirmationEmail} = require('../email');

const router = express.Router();

router.post('/', async function (req, res) {
    const donor = req.body;
    const hash = bcrypt.hashSync(req.body.password, 10);
    const id = donor.id || uuidv4();
    const emailId = uuidv4();
    const emailConfirmation = `http://localhost:8080/confirmEmail?token=${emailId}`;

    let dbResult = await db.get('GGUser', ['*'], `email = '${donor.email}'`);
    if (dbResult.length !== 0) return res.status(500).json({error: 'Already exists'});

    await db.insert('GGUser', ['id', 'email', 'password', 'username', 'location', 'emailConfirmation', 'confirmed'],
        [id, donor.email, hash, donor.name, donor.location, emailId, 'false']);
    await db.insert('Donor', ['id', 'age', 'gender'], [id, donor.age || 0, donor.gender || ""]);
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

    await db.insert('PaymentInfo',
        ['userId', 'address', 'ccNumber', 'cvv', 'expirationDate', 'ccName'],
        [paymentMethod.userId, paymentMethod.address, paymentMethod.ccNumber, paymentMethod.cvv,
            paymentMethod.expirationDate, paymentMethod.ccName]);

    res.sendStatus(200);
});

router.post('/search', async function (req, res) {
    let dbResult = await donorRepository.search(req.body.keyword);
    return res.status(200).json(dbResult);
});

router.get('/export', async function (res, res) {

});

module.exports = router;
