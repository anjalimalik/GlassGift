const express = require('express');
const bcrypt = require("bcryptjs");
const ngoRepository = require('../database/ngo');
const userRepository = require('../database/user');
const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');
const email = require('../email');
const csv = require('csv');
const json2csv = require('json2csv').parse;

const fields = ['id', 'donorId', 'ngoId', 'amount', 'message', 'anonymous', 'type',
  'honoredUserId', 'honoredUserName','created'];

const router = express.Router();

router.post('/', async function (req, res) {
	const ngo = req.body;
	const hash = await bcrypt.hash(req.body.password, 10);
	const emailToken = uuidv4();
	const emailConfirmationLink = `http://localhost:8080/confirmEmail?token=${emailToken}`;

	let dbResult = await ngoRepository.getIdsByEmail(ngo.email);
	if (dbResult.length !== 0) return res.status(500).json({error: 'Already exists'});

	await ngoRepository.create(ngo.email, hash, ngo.name, ngo.location, emailToken, ngo.description, ngo.category,
		ngo.calLink, ngo.minLimit, ngo.maxLimit);

	await email.sendConfirmationEmail(ngo.email, ngo.name, emailConfirmationLink, 0);
	res.sendStatus(200);
});

router.put('/', async function (req, res) {
	const changes = req.body;
    const authorization = req.get('Authorization');
    if (!authorization) return res.status(500).json({error: 'No token supplied'});
    const decoded = jwt.verify(authorization, 'SECRETSECRETSECRET');
    const userId = decoded.id;

	await ngoRepository.edit(req.decodedToken.id, changes.location, changes.description, changes.category,
		changes.calendarLink, changes.minLimit, changes.maxLimit);

	return res.sendStatus(200);
});

router.get('/', async function (req, res) {
	const ngos = await ngoRepository.getById(req.query.id);
	if (ngos.length === 0) return res.status(500).json({error: "NGO not found!"});

	return res.status(200).json(ngos.rows[0]);
});

router.post('/paymentData', async function(req, res){
	const donorId = req.get('Authorization');

	const fileName = req.body.ngoId + donorId + '.csv';

	var data = await db.get('donation', ['*'], `ngoId = '${req.body.ngoId}' ` +
			(req.body.num > 0? `FETCH FIRST ${req.body.num} ROWS ONLY`: ''));

	res.setHeader('Content-disposition', `attachment; filename=${fileName}`);
  	res.set('Content-Type', 'text/csv');

  	const opts = { fields };
  	try{
  		const csv =  json2csv(data, opts);
		res.status(200).send(csv);
	}catch(err){
		console.log(err);
		res.status(500).send(err);
	}
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
	const ngos = await ngoRepository.getById(req.query.id);
	if (ngos.rows.length === 0) return res.status(500).json({error: "Account doesn't exist"});

	const ngo = ngos.rows[0];
	res.status(200).json({notice: ngo.notice});
});

router.put('/notice', async function (req, res) {
    const authorization = req.get('Authorization');
    if (!authorization) return res.status(500).json({error: 'No token supplied'});
    const decoded = jwt.verify(authorization, 'SECRETSECRETSECRET');
    const userId = decoded.id;

	await ngoRepository.setNotice(req.decodedToken.id, req.body.notice);
	return res.sendStatus(200);
});

router.post('/limit/max', async function (req, res) {
	await ngoRepository.setMaxLimit(req.decodedToken.id, req.body.limit);
	return res.sendStatus(200);
});

router.post('/limit/min', async function (req, res) {
	await ngoRepository.setMinLimit(req.decodedToken.id, req.body.limit);
	return res.sendStatus(200);
});

router.post('/newsletter', async function(req, res) {
	await ngoRepository.createNewsletter(req.body["ngoId"], req.body["newsletter"]);
	return res.sendStatus(200);
});

router.post('/newsletter/send', async function(req, res) {
	const newsletter = await ngoRepository.getNewsletter(req.body["ngoId"]);

	(await ngoRepository.getSubscribers(req.body["ngoId"]))
		.map(async (id) => (await userRepository.getEmailsFromId(id))[0])
		.forEach(async (userEmail) => await email.sendNewsletter(newsletter, userEmail));
});

module.exports = router;
