const express = require('express');
const router = express.Router();
const db = require('../database');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/password_reset', function (req, res) {

});

router.get('/login', async function (req, res) {
	const user = req.body;
	const hash = await bcrypt(user.password, saltRounds);
	const rows = await db.get("GGUser", ["email", "password"], `email = ${user.email} AND password = ${hash}`);
	if (rows.length === 0) {
		res.status(500).send("User not found");
	} else {
		res.send(JSON.stringify(rows));
	}
});

module.exports = router;
