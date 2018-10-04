const express = require('express');
const router = express.Router();
const db = require('../database');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/password_reset', function (req, res) {

});

router.get('api/auth/login', async function (req, res) {
	const user = req.body;
	const hash = await bcrypt(user.password, saltRounds);
	const rows = await db.get("GGUser", ["email", "password"], `email = ${user.email} AND password = ${hash}`);
	if (rows.length === 0) {
		throw new Error("User not found");
	} else {
		res.send(JSON.stringify(rows));
	}
});

router.get('api/updateNGO', async function (req, res) {
	const changes = req.body;
	const id_req = `id = ${changes.values.id}`;
	let rows = await db.get("NGO", ["id"], `id = ${changes.id}`);
	if (rows.length === 0) {
		throw new Error(`No NGO with id ${changes.id} found`);
	} else {
		for (let i = 0; i < changes.names.length && i < changes.values.length; i++) {
			await db.modify("NGO", changes.names[i], changes.values[i], id_req);
		}
		rows = await db.get("NGO", ["id"], `id = ${changes.id}`);
		res.send(JSON.stringify(rows));
	}
});

router.get('api/updateDonor', async function (req, res) {
	const changes = req.body;
	const id_req = `id = ${changes.values.id}`;
	const rows = await db.get("Donor", ["id"], `id = ${changes.id}`);
	if (rows.length === 0) {
		throw new Error(`No Donor with id ${changes.id} found`);
	} else {
		for (let i = 0; i < changes.names.length && i < changes.values.length; i++) {
			await db.modify("Donor", changes.names[i], changes.values[i], id_req);
		}
	}
});

router.get('api/getNGONotice', async function (req, res) {
	const NGOuser = req.body;
	const rows = await db.get("NGO", ["id"], `id = ${NGOuser.id}`);
	if (rows.length === 0) {
		throw new Error(`NGO with id ${NGOuser.id} not found`);
	} else if (rows.length > 1) {
		throw new Error(`Several NGOs with id ${NGOuser.id} found`);
	} else {
		res.send(JSON.stringify(rows));
	}
});

router.get('api/searchNGO', function (req, res) {
	//To be discovered
});

module.exports = router;
