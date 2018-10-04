const express = require('express');
const router = express.Router();
const db = require('../database');
const extra = require('../external');
const saltRounds = 10;

router.get('/password_reset', function(req, res) {
    
});

router.get('api/auth/login', function(req, res) {
	const user = req.body;
	const hash = await bcrypt(body.password, saltRounds);
	var rows = await db.retrieve("GGUser", ["email", "password"], [user.email, hash]);
	if(rows.length == 0){
		throw new Error("User not found");
	}else{
		res.send(JSON.stringify(rows));
	}
	var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
	var ipCheck = await db.retrieve("IpAddresses", ["userId", "ip"], [rows.id, ip]);
	if(ipCheck.length == 0){
		extra.sendIPemail(user.email, ip);
	}
});

module.exports = router;
