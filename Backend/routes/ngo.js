const express = require('express');
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
const db = require('../database');
var uuid = require('uuid/v3');
const email = require('../email')

const router = express.Router();
const saltRounds = 10;

router.post('/', async function(req, res) {
    const ngo = req.body;
    const hash = bcryptjs.hashSync(req.body.password, 10);
    var id = uuid(ngo.email, uuid.DNS);
    var emailConfirmation = `http://localhost:8080/confirmEmail?email=${id}`;

    await db.insert("GGUser",
        ["id","email", "password", "name", "location", "emailConfirmation", "confirmed"],
        [id, ngo.email, hash, ngo.name, ngo.location, emailConfirmation, false]);
    await db.insert("NGO",
        ["id", "emailTemplate", "description", "calLink", "notice", "minLimit", "maxLimit"],
        [id, ngo.emailTemplate, ngo.description, ngo.calLink, ngo.notice, ngo.minLimit, ngo.maxLimit]);
    
    email.sendConfirmationEmail(ngo.email, ngo.name, emailConfirmation, 0);
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

router.get('/search', async function (req, res) {
	const basis = req.body.BasisOf;
	const keyword = req.body.key;

	switch(basis){
		case 0:
			//keyword 
			var rows = db.get("GGUser", "*", `name LIKE ${keyword} AND INNER JOIN NGO ON NGO.id = GGUser.id`);
			res.status(200).send(JSON.stringify(rows));
			break;
		case 1:
			//location
			var rows = db.get("GGUser", "*", `location LIKE ${keyword} AND INNER JOIN NGO ON NGO.id = GGUser.id`);
			res.status(200).send(JSON.stringify(rows));
			break;
		case 2:
			//category
			var rows = db.get("NGO", "*", `category LIKE ${keyword} AND INNER JOIN GGUser ON GGUser.id = NGO.id`);
			res.status(200).send(JSON.stringify(rows));
			break;
		default:
			res.status(500).send('The search criteria did not match what was offered.');
			break;
	}
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
