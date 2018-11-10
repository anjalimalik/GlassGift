const express = require('express');
const bcrypt = require("bcryptjs");
const ngoRepository = require('../database/ngo');
const uuidv4 = require('uuid/v4');
const {sendConfirmationEmail} = require('../email');

const router = express.Router();

router.post('/', async function (req, res) {
	const ngo = req.body;
	const hash = await bcrypt.hash(req.body.password, 10);
	const id = ngo.id || uuidv4();
	const emailId = uuidv4();
	const emailConfirmation = `http://localhost:8080/confirmEmail?token=${emailId}`;

	let dbResult = await db.get('GGUser', ['id'], `email = '${ngo.email}'`);
	if (dbResult.length !== 0) return res.status(500).json({error: 'Already exists'});

	await db.insert('GGUser', ['id', 'email', 'password', 'username', 'location', 'emailConfirmation', 'confirmed'],
		[id, ngo.email, hash, ngo.name, ngo.location, emailId, 'false']);
	await db.insert('NGO', ['id', 'description', 'category', 'calLink', 'minLimit', 'maxLimit'],
		[id, ngo.description, ngo.category, ngo.calLink, ngo.minLimit || 0, ngo.maxLimit || 0]);

	sendConfirmationEmail(ngo.email, ngo.name, emailConfirmation, 0);
	res.sendStatus(200);
});

router.put('/', async function (req, res) {
	const changes = req.body;

	await db.modify('GGUser', 'location', changes.location, `id = '${req.decodedToken.id}'`);
	await db.modify('NGO', ['description', 'calLink', 'minLimit', 'maxLimit'],
		[changes.description, changes.category, changes.calendarLink, changes.minLimit || 0, changes.maxLimit || 0],
		`id = '${req.decodedToken.id}'`);

	return res.sendStatus(200);
});

router.get('/', async function (req, res) {
	const id = req.query.id;

	const dbResult = await db.get('GGUser INNER JOIN NGO ON GGUser.id = NGO.id',
		['NGO.id as id', 'username', 'email', 'location', 'category', 'description',
			'calLink', 'notice', 'minLimit', 'maxLimit']);
	if (dbResult.rows.length !== 1) return res.status(500).json({error: "NGO not found!"});

	return res.status(200).json(dbResult.rows[0]);
});

router.post('/search', async function (req, res) {
    switch (req.body.type) {
		case 0:
			return res.status(200).json(ngoRepository.searchByName(req.body.keyword));
		case 1:
			return res.status(200).json(ngoRepository.searchByLocation(req.body.keyword));
		case 2:
			return res.status(200).json(ngoRepository.searchByCategory(req.body.keyword));
		default:
			return res.status(500).json({error: "Couldn't match type"});
	}
});

router.get('/notice', async function (req, res) {
	const dbResult = await db.get('NGO', ['notice'], `id = '${req.query.id}'`);
	if (dbResult.rows.length !== 1) return res.status(500).json({error: "Account doesn't exist"});

	const dbUser = dbResult.rows[0];
	res.status(200).json({notice: dbUser.notice});
});

router.put('/notice', async function (req, res) {
	await db.modify('NGO', 'notice', req.body.notice, `id = '${req.decodedToken.id}'`);
	return res.sendStatus(200);
});

router.post('/limit/max', async function (req, res) {
	await db.modify('NGO', 'maxLimit', req.body.limit, `id = '${req.decodedToken.id}'`);
	return res.sendStatus(200);
});

router.post('/limit/min', async function (req, res) {
	await db.modify('NGO', 'minLimit', req.body.limit, `id = '${req.decodedToken.id}'`);
	return res.sendStatus(200);
});

router.post('/newsletter', async function(req, res) {

});

router.post('/newsletter/send', async function(req, res) {

});

module.exports = router;
