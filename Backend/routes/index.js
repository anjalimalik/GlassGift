const express = require('express');
const router = express.Router();
const db = require('../database');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const saltRounds = 10;

router.get('/password_reset', function (req, res) {

});

router.get('/login', async function (req, res) {
	const user = await db.get("GGUser", ["email", "password"], `email = ${req.body.email}`);
	if (rows.length === 0) {
		res.status(500).send("User not found");
	} else {
		var validPassword = bcrypt.compareSync(req.body.password, user.password);
		if(!validPassword){
			return res.status(401).send({ auth: false, token: null });
		}

		var token = jwt.sign(user.email, config.secret, {
      		expiresIn: 86400 // expires in 24 hours
    	});

    	res.status(200).send({auth: true, token: token});
	}
});

module.exports = router;
