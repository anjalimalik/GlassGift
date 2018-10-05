const express = require('express');
const bcrypt = require("bcrypt");
const db = require('../database');

const router = express.Router();
const saltRounds = 10;

router.post('/', async function(req, res) {
    console.log('here');
    const donor = req.body;
    const hash = bcrypt.hashSync(req.body.password, 10);
    var id = uuid(donor.email, uuid.DNS);
    var emailConfirmation = `http://localhost:8080/confirmEmail?email=${id}`;

    await db.insert("GGUser",
        ["id","email", "password", "name", "location", "emailConfirmation", "confirmed"],
        [id, donor.email, hash, donor.name, donor.location, emailConfirmation, false]);
    await db.insert("Donor",
        ["paymentData", "age", "gender"],
        [null, donor.age, donor.gender]);
    email.sendConfirmationEmail(ngo.email, donor.name, emailConfirmation, 0);
    res.status(200);
});

router.put('/', async function (req, res) {
	const changes = req.body;
	const id_req = `id = ${changes.values.id}`;
	const rows = await db.get("Donor", ["id"], `id = ${changes.id}`);
	if (rows.length === 0) {
	    res.status(500).send(`No Donor with id ${changes.id} found`);
	} else {

		res.status(200);
	}
});

module.exports = router;
