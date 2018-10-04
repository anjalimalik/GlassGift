const express = require('express');
const bcrypt = require("bcrypt");
const db = require('../database');

const router = express.Router();
const saltRounds = 10;

router.post('/', async function(req, res) {
    const ngo = req.body;
    const hash = await bcrypt(ngo.password, saltRounds);
    
    await db.insert("GGUser",
        ["email", "password", "location", "emailConfirmation", "confirmed"],
        [ngo.email, hash, ngo.location, ngo.emailConfirmation, ngo.confirmed]);
    await db.insert("Donor",
        ["emailTemplate", "description", "calLink", "notice", "minLimit", "maxLimit"],
        [ngo.emailTemplate, ngo.description, ngo.calLink, ngo.notice, ngo.minLimit, ngo.maxLimit]);
    res.status(200);
});

router.put('/', async function (req, res) {
	const changes = req.body;
	const id_req = `id = ${changes.values.id}`;
	let rows = await db.get("NGO", ["id"], `id = ${changes.id}`);
	if (rows.length === 0) {
		res.status(500).send(`No NGO with id ${changes.id} found`);
	} else {
		for (let i = 0; i < changes.names.length && i < changes.values.length; i++) {
			await db.modify("NGO", changes.names[i], changes.values[i], id_req);
		}
		rows = await db.get("NGO", ["id"], `id = ${changes.id}`);
		res.send(JSON.stringify(rows));
	}
});

router.get('/search', function (req, res) {
	//To be discovered
});

router.get('/notice', async function (req, res) {
	const NGOuser = req.body;
	const rows = await db.get("NGO", ["id"], `id = ${NGOuser.id}`);
	if (rows.length === 0) {
		res.status(500).send(`NGO with id ${NGOuser.id} not found`);
	} else if (rows.length > 1) {
		res.status(500).send(`Several NGOs with id ${NGOuser.id} found`);
	} else {
		res.send(JSON.stringify(rows));
	}
});

router.put('/notice', async function(req, res) {
    await db.modify('NGO', 'notice', req.body.notice, `id = ${req.body.id}`);
    res.status(200);
});

module.exports = router;
