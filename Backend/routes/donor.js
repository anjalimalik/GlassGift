const express = require('express');
const bcrypt = require("bcrypt");
const db = require('../database');

const router = express.Router();
const saltRounds = 10;

router.post('/', async function(req, res) {
    const donor = req.body;
    const hash = bcryptjs.hashSync(req.body.password, 10);
    var id = uuid(donor.email, uuid.DNS);
    var emailConfirmation = `http://localhost:8080/confirmEmail?email=${id}`;
    
    await db.insert("GGUser",
        ["id","email", "password", "location", "emailConfirmation", "confirmed"],
        [id, donor.email, hash, donor.location, emailConfirmation, false]);
    await db.insert("Donor",
        ["paymentData", "age", "gender"],
        [donor.paymentData, donor.age, donor.gender]);
        
    var token = jwt.sign(id, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    email.sendConfirmationEmail(ngo.email, "Placeholder", emailConfirmation, 0);
    res.status(200).send({auth: true, token: token});
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
