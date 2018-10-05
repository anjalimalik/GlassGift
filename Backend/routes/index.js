const express = require('express');
const router = express.Router();
const db = require('../database');
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');
var jwt = require('jsonwebtoken');
const { sendForgotPasswordEmail, sendIPEmail } = require('../email');
const saltRounds = 10;

router.post('/login', async function (req, res) {
	try {
		const user = req.body;

		let query = `SELECT * from GGUser where email = '${user.email}'`;
		let dbResult = await db.pool.query(query);
		if (dbResult.rows.length !== 1) throw new Error('Account doesn\'t exist');

		const dbUser = dbResult.rows[0];

		await bcrypt.compare(user.password, dbUser.password);

		if (!dbUser.confirmed) throw new Error('Not confirmed');

		// Check IP
		query = `SELECT ip from UserIps where userId = '${dbUser.id}'`;
		dbResult = await db.pool.query(query);
		if (!dbResult.rows.find(row => row.ip === req.ip)) {
			sendIPEmail(dbUser.email, req.ip);
			query = `INSERT INTO UserIps(userId, ip) VALUES ('${dbUser.id}', '${req.ip}')`;
			await db.pool.query(query);
		}

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
		const emailConfirmation = `http://localhost:8080/confirmEmail?token=${emailId}`;

		query = `UPDATE GGUser SET resetPasswordToken = '${emailId}' where email = '${email}'`
		await db.pool.query(query);

		await sendForgotPasswordEmail('noahster11@gmail.com', emailConfirmation)

		return res.sendStatus(200);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

router.post('/confirm_password', async function (req, res) {
	try {
		const { token, password } = req.body;

		let query = `SELECT * from GGUser where resetPasswordToken = '${token}'`;
		let dbResult = await db.pool.query(query);
		if (dbResult.rows.length !== 1) throw new Error('Account doesn\'t exist');

		const id = dbResult.rows[0].id;

		const hash = await bcrypt.hash(password, 10);

		query = `UPDATE GGUser SET password = '${hash}' where id = '${id}'`;
		await db.pool.query(query);

		return res.sendStatus(200);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

router.post('/confirm_account', async function (req, res) {
	try {
		const { token } = req.body;

		let query = `SELECT * from GGUser where emailConfirmation = '${token}'`;
		let dbResult = await db.pool.query(query);
		if (dbResult.rows.length !== 1) throw new Error('Account doesn\'t exist');

		const id = dbResult.rows[0].id;

		query = `UPDATE GGUser SET confirmed = 'true' where id = '${id}'`;
		await db.pool.query(query);

		return res.sendStatus(200);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

module.exports = router;
