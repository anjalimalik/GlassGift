const express = require('express');
const bcrypt = require("bcrypt");
const uuidv4 = require('uuid/v4');
const db = require('../database');
const { sendConfirmationEmail } = require('../email');

const router = express.Router();
const saltRounds = 10;

router.post('/', async function(req, res) {
  const donor = req.body;
  const hash = bcrypt.hashSync(req.body.password, 10);
  const id = uuidv4();
  const emailId = uuidv4();
  const emailConfirmation = `http://localhost:8080/confirmEmail?token=${emailId}`;

  try {
    let query = `SELECT * FROM GGUser WHERE email = '${donor.email}'`;
    let dbResult = await db.pool.query(query);
    if (dbResult.rows.length !== 0) throw new Error('Already exists');

    query = `INSERT INTO GGUser(id, email, password, name, location, emailConfirmation, confirmed) VALUES ('${id}', '${donor.email}', '${hash}', '${donor.name}', '${donor.location}', '${emailId}', 'false')`;
    await db.pool.query(query);

    // query = `INSERT INTO DONOR(id, age, gender) VALUES ('${id}', '${donor.age}', '${donor.gender}')`
    // await db.pool.query(query)

    sendConfirmationEmail(donor.email, donor.name, emailConfirmation, 1);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/', async function (req, res) {
	const changes = req.body;

  try {
    const token = res.get('Authorization');
    if (!token) throw new Error('No token supplied');

    const decoded = jwt.verify(token, 'SECRETSECRETSECRET');

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

	// const id_req = `id = ${changes.values.id}`;
	// const rows = await db.get("Donor", ["id"], `id = ${changes.id}`);
	// if (rows.length === 0) {
	//     res.status(500).send(`No Donor with id ${changes.id} found`);
	// } else {
  //
	// 	res.status(200);
	// }
});

router.post('/search', async function (req, res) {
  try {
    const keyword = req.body.keyword;

    let innerJoinQuery = 'SELECT Donor.id as id, name, email, paymentData, age, gender FROM GGUser INNER JOIN NGO ON GGUser.id = Donor.id';
    let dbResult = await db.pool.query(innerJoinQuery + ` WHERE name LIKE \'%${keyword}%\'`);
    return res.status(200).json(dbResult.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
