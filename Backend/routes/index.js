const express = require('express');
const router = express.Router();
const db = require('../database');
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');
const {sendForgotPasswordEmail, sendIPEmail} = require('../email');

router.post('/login', async function (req, res) {
	const user = req.body;

	let dbResult = await db.get('GGUser', ['*'], `email = '${user.email}'`);
	if (dbResult.length !== 1) return res.status(500).json({error: "Account doesn't exist"});

	const dbUser = dbResult.rows[0];

	const match = await bcrypt.compare(user.password, dbUser.password);
	if (!match) return res.status(500).json({error: "Wrong password"});

	if (!dbUser.confirmed) return res.status(500).json({error: "Not confirmed"});

	// Check IP
	dbResult = await db.get('UserIps', ['ip'], `userId = '${dbUser.id}'`);
	if (!dbResult.rows.find(row => row.ip === req.ip)) {
		sendIPEmail(dbUser.email, req.ip);
		await db.insert('UserIps', ['userId', 'ip'], [dbUser.id, req.ip]);
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
});

router.post('/reset_password', async function (req, res) {
	console.log(req.body);
	const email = req.body.email;

	let dbResult = await db.get('GGUser', ['*'], `email = '${email}'`);
	if (dbResult.length !== 1) {
		console.log("Account doesn't exist");
		return res.status(500).json({error: "Account doesn't exist"});
	}

	const emailId = uuidv4();
	const emailConfirmation = `http://localhost:8080/resetPassword?token=${emailId}`;

	await db.modify('GGUser', 'resetPasswordToken', emailId, `email = '${email}'`);
	await sendForgotPasswordEmail('noahster11@gmail.com', emailConfirmation);

	return res.sendStatus(200);
});

router.post('/confirm_password', async function (req, res) {
	const {token, password} = req.body;

	let dbResult = await db.get('GGUser', ['*'], `resetPasswordToken = '${token}'`);
	if (dbResult.length !== 1) {
		console.log("Account doesn't exist");
		return res.status(500).json({error: "Account doesn't exist"});
	}

	const id = dbResult.rows[0].id;
	const hash = await bcrypt.hash(password, 10);

	await db.modify('GGUser', 'password', hash, `id = '${id}'`);

	return res.sendStatus(200);
});

router.post('/confirm_account', async function (req, res) {
	const {token} = req.body;

	let dbResult = await db.get('GGUser', ['*'], `emailConfirmation = '${token}'`);
	if (dbResult.length !== 1) return res.status(500).json({error: "Account doesn't exist"});

	const id = dbResult.rows[0].id;
	await db.modify('GGUser', 'confirmed', 'true', `id = '${id}'`);

	return res.sendStatus(200);
});

module.exports = router;
