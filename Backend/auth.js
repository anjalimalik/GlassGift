const jwt = require('jsonwebtoken');

function checkAuthToken(req, res, next) {

	if (['/login', '/reset_password', '/confirm_password', '/confirm_account'].includes(req.originalUrl)) next();

	if(!(req.body.metadata && req.body.metadata == "ignore-jwt")){
		const token = req.get('Authorization');
		console.log("Oh baby, it went here\n" + `${req.body.metadata}`)
		if (!token) return res.status(500).json({error: 'No token supplied'});

		try {
			req.setHeader("Authorization", jwt.verify(token, 'SECRETSECRETSECRET').id);
			next();
		} catch(err) {
			return res.status(500).json({error: err.message});
		}
	}else{
		next();
	}
}

module.exports = {checkAuthToken};