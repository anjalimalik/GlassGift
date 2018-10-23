const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const db = require('../database');
const uuidv4 = require('uuid/v4');
const {sendConfirmationEmail} = require('../email');

const router = express.Router();

router.post('/', async function (req, res) {
	const ngo = req.body;
	const hash = await bcrypt.hash(req.body.password, 10);
	const id = uuidv4();
	const emailId = uuidv4();
	const emailConfirmation = `http://localhost:8080/confirmEmail?token=${emailId}`;

	let query = `SELECT * FROM GGUser WHERE email = '${ngo.email}'`;
	let dbResult = await db.pool.query(query);
	if (dbResult.rows.length !== 0) {
		console.log('Already exists');
		return res.status(500).json({error: 'Already exists'});
	}

	query = `INSERT INTO GGUser(id, email, password, username, location, emailConfirmation, confirmed) VALUES ('${id}', '${ngo.email}', '${hash}', '${ngo.name}', '${ngo.location}', '${emailId}', 'false')`;
	await db.pool.query(query);
	query = `INSERT INTO NGO(id, description, ngoCategory, calLink, minLimit, maxLimit) VALUES ('${id}', '${ngo.description}', '${ngo.category}', '${ngo.calLink}', '${ngo.minLimit || 0}', '${ngo.maxLimit || 0}')`;
	await db.pool.query(query);

	sendConfirmationEmail(ngo.email, ngo.name, emailConfirmation, 0);
	res.sendStatus(200);
});

router.put('/', async function (req, res) {
	const changes = req.body;

	const token = req.get('Authorization');
	if (!token) {
		console.log('No token supplied');
		return res.status(500).json({error: 'No token supplied'});
	}

	const decoded = jwt.verify(token, 'SECRETSECRETSECRET');

	let query = `UPDATE GGUser SET location = '${changes.location}' WHERE id = '${decoded.id}'`;
	await db.pool.query(query);
	query = `UPDATE NGO SET description = '${changes.description}', category = '${changes.category}', calLink = '${changes.calendarLink}', minLimit = '${changes.minLimit || 0}', maxLimit = '${changes.maxLimit || 0}' WHERE id = '${decoded.id}'`;
	await db.pool.query(query);

	return res.sendStatus(200);
});

router.get('/', async function (req, res) {
	const id = req.query.id;

	const query = 'SELECT NGO.id as id, username, email, location, ngoCategory, description, calLink, notice, minLimit, maxLimit FROM GGUser INNER JOIN NGO ON GGUser.id = NGO.id';
	const dbResult = await db.pool.query(query);
	if (dbResult.rows.length !== 1) {
		console.log("NGO not found!");
		return res.status(500).json({error: "NGO not found!"});
	}

	return res.status(200).json(dbResult.rows[0]);
});

router.post('/search', async function (req, res) {
	const type = req.body.type;
	const keyword = req.body.keyword;

	const NAME = 0;
	const LOCATION = 1;
	const CATEGORY = 2;

	let innerJoinQuery = 'SELECT NGO.id as id, username, email, location, ngoCategory, description, calLink, notice, minLimit, maxLimit FROM GGUser INNER JOIN NGO ON GGUser.id = NGO.id';
	let dbResult;
	if (type === NAME) {
		dbResult = await db.pool.query(innerJoinQuery + ` WHERE name LIKE \'%${keyword}%\'`);
		return res.status(200).json(dbResult.rows);
	} else if (type === LOCATION) {
		dbResult = await db.pool.query(innerJoinQuery + ` WHERE location LIKE \'%${keyword}%\'`);
		return res.status(200).json(dbResult.rows);
	} else if (type === CATEGORY) {
		dbResult = await db.pool.query(innerJoinQuery + ` WHERE category = \'${keyword}\'`);
		return res.status(200).json(dbResult.rows);
	} else {
		console.log("Couldn't match type");
		return res.status(500).json({error: "Couldn't match type"});
	}
});

router.get('/notice', async function (req, res) {
	const id = req.query.id;
	const query = `SELECT notice FROM NGO WHERE id = '${id}'`;
	const dbResult = await db.pool.query(query);
	if (dbResult.rows.length !== 1) {
		console.log("Account doesn't exist");
		return res.status(500).json({error: "Account doesn't exist"});
	}

	const dbUser = dbResult.rows[0];
	res.status(200).json({notice: dbUser.notice});
});

router.put('/notice', async function (req, res) {
	const notice = req.body.notice;
	const token = req.get('Authorization');
	if (!token) {
		console.log('No token supplied');
		return res.status(500).json({error: 'No token supplied'});
	}

	const decoded = jwt.verify(token, 'SECRETSECRETSECRET');

	let query = `UPDATE NGO SET notice = '${notice}' WHERE id = '${decoded.id}'`;
	await db.pool.query(query);

	return res.sendStatus(200);
});

router.post('/limit/max', async function (req, res) {
	const limit = req.body.limit;

	const token = req.get('Authorization');
	if (!token) {
		console.log('No token supplied');
		return res.status(500).json({error: 'No token supplied'});
	}

	const decoded = jwt.verify(token, 'SECRETSECRETSECRET');

	let query = `UPDATE NGO SET maxLimit = '${limit}' WHERE id = '${decoded.id}'`;
	await db.pool.query(query);

	return res.sendStatus(200);
});

router.post('/limit/min', async function (req, res) {
	const limit = req.body.limit;

	const token = req.get('Authorization');
	if (!token) {
		console.log('No token supplied');
		return res.status(500).json({error: error.message});
	}

	const decoded = jwt.verify(token, 'SECRETSECRETSECRET');
	let query = `UPDATE NGO SET minLimit = '${limit}' WHERE id = '${decoded.id}'`;
	await db.pool.query(query);

	return res.sendStatus(200);
});

module.exports = router;
