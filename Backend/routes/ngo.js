const express = require('express');
const bcrypt = require("bcryptjs");
const db = require('../database');
const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');
const {sendConfirmationEmail} = require('../email');
const csv = require('csv');
const json2csv = require('json2csv').parse;

const fields = ['id', 'donorId', 'ngoId', 'amount', 'message', 'anonymous', 'type',
  'honoredUserId', 'honoredUserName','created'];

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
	await db.insert('NGO', ['id', 'description', 'category', 'callink', 'minLimit', 'maxLimit'],
		[id, ngo.description, ngo.category, ngo.calLink, ngo.minLimit || 0, ngo.maxLimit || 0]);

	sendConfirmationEmail(ngo.email, ngo.name, emailConfirmation, 0);
	res.sendStatus(200);
});

router.put('/', async function (req, res) {
	const changes = req.body;

	const authorization = req.get('Authorization');
	const userId = authorization;

	await db.pool.query(`UPDATE GGUser SET location = '${changes.location}' where id = '${userId}'`)
	await db.pool.query(`UPDATE NGO SET category = '${changes.category}', description = '${changes.description}', callink = '${changes.calLink}', minLimit = '${changes.minLimit || 0}', maxLimit = '${changes.maxLimit || 0}'`)

	return res.sendStatus(200);
});

router.get('/', async function (req, res) {
	const id = req.query.id;

	const dbResult = await db.get('GGUser INNER JOIN NGO ON GGUser.id = NGO.id',
		['NGO.id as id', 'username', 'email', 'location', 'category', 'description',
			'calLink', 'notice', 'minLimit', 'maxLimit']);
	if (dbResult.length !== 1) return res.status(500).json({error: "NGO not found!"});2

	return res.status(200).json(dbResult[0]);
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

router.post('/paymentVisualization', async function(req, res){
	const donorId = req.get('Authorization');
	const check = await db.get('GGUser', ['*'], `id = '${donorId}'`);
	if(!check){ return res.status(500).send("User not found"); }

	var data = await db.get('donation', ['amount', 'created'], `ngoId = '${req.body.ngoId}' AND `+
					`created BETWEEN '${req.body.startdate} 00:00:00.0' AND '${req.body.enddate} 00:00:00.0'`);

	res.status(200).json(data);
});

router.post('/search', async function (req, res) {
	const keyword = req.body.keyword;
	let where;

	switch (req.body.type) {
		case 0: // Name
			where = `username LIKE \'%${keyword}%\'`;
			break;
		case 1: // Location
			where = `location LIKE \'%${keyword}%\'`;
			break;
		case 2: // Category
			where = `category = \'${keyword}\'`;
			break;
		default:
			return res.status(500).json({error: "Couldn't match type"});
	}


	const dbResult = await db.get('GGUser INNER JOIN NGO ON GGUser.id = NGO.id',
		['NGO.id as id', 'username', 'email', 'location', 'category', 'description', 'calLink', 'notice',
			'minLimit', 'maxLimit'], where);
	return res.status(200).json(dbResult);
});

router.get('/notice', async function (req, res) {
	const dbResult = await db.get('NGO', ['notice'], `id = '${req.query.id}'`);
	if (dbResult.length !== 1) return res.status(500).json({error: "Account doesn't exist"});

	const dbUser = dbResult[0];
	res.status(200).json({notice: dbUser.notice});
});

router.put('/notice', async function (req, res) {

	const authorization = req.get('Authorization');
	if (!authorization) return res.status(500).json({error: 'No token supplied'});
	const decoded = jwt.verify(authorization, 'SECRETSECRETSECRET');
	const userId = decoded.id;

	await db.pool.query(`UPDATE NGO SET notice = '${req.body.notice}' WHERE id = '${userId}'`);

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

module.exports = router;
