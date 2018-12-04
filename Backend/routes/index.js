const express = require('express');
const router = express.Router();
const userRepository = require("../database/user");
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');
const {sendForgotPasswordEmail, sendIPEmail} = require('../email');

router.post('/login', async function (req, res) {
	const user = req.body;

	let dbUser = await userRepository.getByEmail(user.email);
	if (!dbUser.id) return res.status(500).json({error: "Account doesn't exist"});

	const match = await bcrypt.compare(user.password, dbUser.password);
	if (!match) return res.status(500).json({error: "Wrong password"});

	if (!dbUser.confirmed) return res.status(500).json({error: "Not confirmed"});

	// Check IP
	const ips = await userRepository.getIpsById(dbUser.id);
	if (ips.length !== 0 && !ips.find(row => row.ip === req.ip)) {
		sendIPEmail(dbUser.email, req.ip);
		await userRepository.addNewIp(dbUser.id, req.ip);
	}

	const j = jwt.sign({
		exp: Math.floor(Date.now() / 1000) + (60 * 60),
		id: dbUser.id,
	}, 'SECRETSECRETSECRET');

	return res.status(200).json({
		user: dbUser,
		token: j,
	});
});

router.post('/reset_password', async function (req, res) {
    let users = await userRepository.getByEmail(req.body.email);
	if (users.length !== 1) return res.status(500).json({error: "Account doesn't exist"});

	const token = uuidv4();
	const emailConfirmation = `http://localhost:8080/resetPassword?token=${token}`;
	await userRepository.setResetPasswordToken(req.body.email, token);
	await sendForgotPasswordEmail('noahster11@gmail.com', emailConfirmation);

	return res.sendStatus(200);
});

router.post('/confirm_password', async function (req, res) {
	let users = await userRepository.getByResetPasswordToken(req.body.token);
	if (users.length !== 1) return res.status(500).json({error: "Account doesn't exist"});

	const id = users.rows[0].id;
	const newPasswordHash = await bcrypt.hash(req.body.password, 10);

	await userRepository.changePassword(id, newPasswordHash);
	return res.sendStatus(200);
});

router.post('/confirm_account', async function (req, res) {
	let users = await userRepository.getByEmailConfirmationToken(req.body.token);
	if (users.length !== 1) return res.status(500).json({error: "Account doesn't exist"});

    userRepository.confirmById(users[0].id);
	return res.sendStatus(200);
});

module.exports = router;
