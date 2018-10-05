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
      const emailConfirmation = `http://localhost:8080/confirmEmail?email=${emailId}`;

      let query = `SELECT * FROM GGUser WHERE email = '${ngo.email}'`;
      let dbResult = await db.pool.query(query);
      if (dbResult.rows.length !== 0) throw new Error('Already exists');

      query = `INSERT INTO GGUser(id, email, password, name, location, emailConfirmation, confirmed) VALUES ('${id}', '${ngo.email}', '${hash}', '${ngo.name}', '${ngo.location}', '${emailId}', 'false')`;
      await db.pool.query(query);

      query = `INSERT INTO NGO(id, description, calLink, minLimit, maxLimit) VALUES ('${id}', '${ngo.description}', '${ngo.calLink}', '${ngo.minLimit || 0}', '${ngo.maxLimit || 0}')`;
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

    query = `UPDATE NGOCategories SET category = '${changes.category}' WHERE ngoId = '${decoded.id}'`;
    await db.pool.query(query);

    query = `UPDATE NGO SET description = '${changes.description}', calLink = '${changes.calendarLink}', minLimit = '${changes.minLimit || 0}', maxLimit = '${changes.maxLimit || 0}' WHERE id = '${decoded.id}'`;
    await db.pool.query(query);

    return res.sendStatus(200);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

router.get('/search', async function (req, res) {
	const basis = req.body.BasisOf;
	const keyword = req.body.key;

	let innerJoinQuery = 'SELECT name, email, location, category, description, calLink, notice, minLimit, maxLimit' + 
						 'FROM GGUser' + 
						 'INNER JOIN NGO' + 
						 'ON GGUser.id = NGO.id';
	switch(basis){
		case 0:
			//keywordwhere 
			var rows = db.pool.query(innerJoinQuery + ` WHERE name LIKE \'%${keyword}%\'`);
			res.status(200).send(JSON.stringify(rows));
			break;
		case 1:
			//location
			var rows = db.pool.query(innerJoinQuery + ` WHERE location LIKE \'%${keyword}%\'`);
			res.status(200).send(JSON.stringify(rows));
			break;
		case 2:
			//category
			var rows = db.pool.query(innerJoinQuery + ` WHERE category = \'${keyword}\'`);
			res.status(200).send(JSON.stringify(rows));
			break;
		default:
			res.status(500).send('The search criteria did not match what was offered.');
			break;
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
  const notice = req.body.notice;

  try {
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
