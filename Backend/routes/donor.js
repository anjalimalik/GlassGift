const express = require('express');
const bcrypt = require("bcrypt");
const db = require('../database');

const router = express.Router();
const saltRounds = 10;

router.post('/', async function(req, res) {
    const donor = req.body;
    const hash = await bcrypt(donor.password, saltRounds);
    
    await db.insert("GGUser",
        ["email", "password", "location", "emailConfirmation", "confirmed"],
        [donor.email, hash, donor.location, donor.emailConfirmation, donor.confirmed]);
    await db.insert("Donor",
        ["paymentData", "age", "gender"],
        [donor.paymentData, donor.age, donor.gender]);
        
    res.status(200);
});

router.put('/', async function (req, res) {
	const changes = req.body;
	const id_req = `id = ${changes.values.id}`;
	const rows = await db.get("Donor", ["id"], `id = ${changes.id}`);
	if (rows.length === 0) {
	    res.status(500).send(`No Donor with id ${changes.id} found`);
	} else {
		for (let i = 0; i < changes.names.length && i < changes.values.length; i++) {
			await db.modify("Donor", changes.names[i], changes.values[i], id_req);
		}
		res.status(200);
	}
});

module.exports = router;
