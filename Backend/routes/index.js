const express = require('express');
const router = express.Router();
const db = require('../database');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const saltRounds = 10;

router.post('/login', async function (req, res) {
	const user = req.body;

	try {
		let query = `SELECT * from GGUser where email = '${user.email}'`;
		let dbResult = await db.pool.query(query);
		if (dbResult.rows.length !== 1) throw new Error('Account doesn\'t exist');

		const dbUser = dbResult.rows[0];

		await bcrypt.compare(user.password, dbUser.password);

		// if (!dbUser.confirmed) throw new Error('Not confirmed');

		const j = jwt.sign({
  		exp: Math.floor(Date.now() / 1000) + (60 * 60),
  		id: dbUser.id,
		}, 'SECRETSECRETSECRET');

		return res.status(200).json({
			user: {
				id: dbUser.id,
				email: dbUser.email,
				name: dbUser.name,
			},
			token: j,
		});

	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

router.post('/reset_password', async function (req, res) {
	try {
		const email = req.body.email;

		let query = `SELECT * from GGUser where email = '${email}'`;
		let dbResult = await db.pool.query(query);
		if (dbResult.rows.length !== 1) throw new Error('Account doesn\'t exist');

		const emailId = uuidv4();
		const emailConfirmation = `http://localhost:8080/confirmEmail?email=${emailId}`;
		// TODO send email

		query = `UPDATE GGUser SET resetPasswordToken = '${emailId}' where email = '${email}'`


		return res.sendStatus(200);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

router.post('/confirm_password', async function (req, res) {
	try {
		const { token, password } = req.body;

		return res.sendStatus(200);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

module.exports = router;
