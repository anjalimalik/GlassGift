const express = require('express');
const bcrypt = require("bcrypt");
const uuidv4 = require('uuid/v4');
const db = require('../database');
const jwt = require("jsonwebtoken");
const {sendConfirmationEmail} = require('../email');

const router = express.Router();

router.post('/', async function (req, res) {
	const donor = req.body;
	const hash = bcrypt.hashSync(req.body.password, 10);
	const id = uuidv4();
	const emailId = uuidv4();
	const emailConfirmation = `http://localhost:8080/confirmEmail?token=${emailId}`;

	let query = `SELECT * FROM GGUser WHERE email = '${donor.email}'`;
	let dbResult = await db.pool.query(query);
	if (dbResult.rows.length !== 0) {
		console.log('Already exists');
		return res.status(500).json({error: 'Internal server error'});
	}

	query = `INSERT INTO GGUser(id, email, password, username, location, emailConfirmation, confirmed) VALUES
 				('${id}', '${donor.email}', '${hash}', '${donor.name}', '${donor.location}', '${emailId}', 'false')`;
	await db.pool.query(query);
	sendConfirmationEmail(donor.email, donor.name, emailConfirmation, 1);

	res.sendStatus(200);
});

router.put('/', async function (req, res) {
	const changes = req.body;

	try {
		const token = res.get('Authorization');
		if (!token) throw new Error('No token supplied');

		const decoded = jwt.verify(token, 'SECRETSECRETSECRET');

	} catch (error) {
		return res.status(500).json({error: error.message});
	}

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

});

module.exports = router;
