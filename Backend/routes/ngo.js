const express = require('express');
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
const db = require('../database');
var uuidv4 = require('uuid/v4');
const { sendConfirmationEmail } = require('../email');


const router = express.Router();
const saltRounds = 10;

router.post('/', async function(req, res) {
    try {
      const ngo = req.body;
      const hash = await bcrypt.hash(req.body.password, 10);
      const id = uuidv4();
      const emailId = uuidv4();
      const emailConfirmation = `http://localhost:8080/confirmEmail?token=${emailId}`;

      let query = `SELECT * FROM GGUser WHERE email = '${ngo.email}'`;
      let dbResult = await db.pool.query(query);
      if (dbResult.rows.length !== 0) throw new Error('Already exists');

      query = `INSERT INTO GGUser(id, email, password, name, location, emailConfirmation, confirmed) VALUES ('${id}', '${ngo.email}', '${hash}', '${ngo.name}', '${ngo.location}', '${emailId}', 'false')`;
      await db.pool.query(query);

      query = `INSERT INTO NGO(id, description, category, calLink, minLimit, maxLimit) VALUES ('${id}', '${ngo.description}', '${ngo.category}', '${ngo.calLink}', '${ngo.minLimit || 0}', '${ngo.maxLimit || 0}')`;
      await db.pool.query(query)

      sendConfirmationEmail(ngo.email, ngo.name, emailConfirmation, 0);

      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
});

router.put('/', async function (req, res) {
  try {
    const changes = req.body;

    const token = req.get('Authorization');
    if (!token) throw new Error('No token supplied');

    const decoded = jwt.verify(token, 'SECRETSECRETSECRET');

    let query = `UPDATE GGUser SET location = '${changes.location}' WHERE id = '${decoded.id}'`;
    await db.pool.query(query);

    query = `UPDATE NGO SET description = '${changes.description}', category = '${changes.category}' calLink = '${changes.calendarLink}', minLimit = '${changes.minLimit || 0}', maxLimit = '${changes.maxLimit || 0}' WHERE id = '${decoded.id}'`;
    await db.pool.query(query);

    return res.sendStatus(200);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

router.get('/', async function (req, res) {
  try {
    const id = req.query.id;

    const query = 'SELECT NGO.id as id, name, email, location, category, description, calLink, notice, minLimit, maxLimit FROM GGUser INNER JOIN NGO ON GGUser.id = NGO.id';
    const dbResult = await db.pool.query(query);
    if (dbResult.rows.length !== 1) throw new Error("NGO not found!");

    return res.status(200).json(dbResult.rows[0]);

  } catch (error) {
     console.log(error);
     return res.status(500).json({ error: error.message });
   }
});

router.post('/search', async function (req, res) {
  try {
    const type = req.body.type;
  	const keyword = req.body.keyword;

  	let innerJoinQuery = 'SELECT NGO.id as id, name, email, location, category, description, calLink, notice, minLimit, maxLimit FROM GGUser INNER JOIN NGO ON GGUser.id = NGO.id';
    let dbResult;
    if (type === '0') {
      //name
      dbResult = await db.pool.query(innerJoinQuery + ` WHERE name LIKE \'%${keyword}%\'`);
      return res.status(200).json(dbResult.rows);
    } else if (type === '1') {
      //location
      dbResult = await db.pool.query(innerJoinQuery + ` WHERE location LIKE \'%${keyword}%\'`);
      return res.status(200).json(dbResult.rows);
    } else if (type === '2') {
      //category
      dbResult = await db.pool.query(innerJoinQuery + ` WHERE category = \'${keyword}\'`);
      return res.status(200).json(dbResult.rows);
    } else {
      throw new Error('Couldn\'t match type');
  	}
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

router.get('/notice', async function (req, res) {

  try {
    const id = req.query.id;

    const query = `SELECT notice FROM NGO WHERE id = '${id}'`;
    const dbResult = await db.pool.query(query);
    if (dbResult.rows.length !== 1) throw new Error('Account doesn\'t exist');

		const dbUser = dbResult.rows[0];

    res.status(200).json({ notice: dbUser.notice });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

router.put('/notice', async function(req, res) {
  try {
    const notice = req.body.notice;

    const token = req.get('Authorization');
    if (!token) throw new Error('No token supplied');

    const decoded = jwt.verify(token, 'SECRETSECRETSECRET');

    let query = `UPDATE NGO SET notice = '${notice}' WHERE id = '${decoded.id}'`;
    await db.pool.query(query);

    return res.sendStatus(200);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
