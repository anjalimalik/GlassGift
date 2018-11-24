const express = require('express');
const bcrypt = require("bcrypt");
const uuidv4 = require('uuid/v4');
const db = require('../database');
const {sendConfirmationEmail} = require('../email');

const router = express.Router();

router.post('/', async function (req, res) {
	const donor = req.body;
	const hash = bcrypt.hashSync(req.body.password, 10);
	const id = donor.id || uuidv4();
	const emailId = uuidv4();
	const emailConfirmation = `http://localhost:8080/confirmEmail?token=${emailId}`;

	let dbResult = await db.get('GGUser', ['*'], `email = '${donor.email}'`);
	if (dbResult.length !== 0) return res.status(500).json({error: 'Already exists'});

	await db.insert('GGUser', ['id', 'email', 'password', 'username', 'location', 'emailConfirmation', 'confirmed'],
		[id, donor.email, hash, donor.name, donor.location, emailId, 'false']);
	await db.insert('Donor', ['id'], [id]);
	sendConfirmationEmail(donor.email, donor.name, emailConfirmation, 1);

	res.sendStatus(200);
});

router.put('/', async function (req, res) {
	const changes = req.body;

	// const id_req = `id = ${changes.values.id}`;
	// const rows = await db.get("Donor", ["id"], `id = ${changes.id}`);
	// if (rows.length === 0) {
	//     res.status(500).send(`No Donor with id ${changes.id} found`);
	// } else {
	//
	// 	res.status(200);
	// }
});

router.post('/payment_method', async function (req, res) {
	const paymentMethod = req.body.paymentMethod;

	await db.insert('PaymentInfo',
		['userId', 'address', 'ccNumber', 'cvv', 'expirationDate', 'ccName'],
		[paymentMethod.userId, paymentMethod.address, paymentMethod.ccNumber, paymentMethod.cvv,
			paymentMethod.expirationDate, paymentMethod.ccName]);

	res.sendStatus(200);
});

router.post('/search', async function (req, res) {
  try {
    const keyword = req.body.keyword;

    let innerJoinQuery = 'SELECT Donor.id as id, name, email FROM GGUser INNER JOIN Donor ON GGUser.id = Donor.id';
    let dbResult = await db.pool.query(innerJoinQuery + ` WHERE name LIKE \'%${keyword}%\'`);
    return res.status(200).json(dbResult);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

router.post('/newSearch', async function (req, res){
	const donorId = req.get('Authorization');
	const keyword = req.body.term;

	await db.insert('searches', ['id', 'term'], [donorId, keyword]);

	res.status(200).send("Search insertion successful");
});

router.get('/searchHistory', async function(req, res){
	const donorId = req.get('Authorization');
	const keyword = req.query.entry;

	let searches = await db.get('searches', ['term'], `id = ${donorId}${
		keyword === ""? ``: ` AND term LIKE '${keyword}'`} FETCH FIRST 10 ROWS ONLY`);

	res.status(200).send(searches);
});

module.exports = router;
