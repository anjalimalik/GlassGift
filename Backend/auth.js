const jwt = require('jsonwebtoken');

function checkAuthToken(req, res, next) {
	if (['/login', '/reset_password', '/confirm_password', '/confirm_account'].contains(req.originalUrl)) next();

	const token = req.get('Authorization');
	if (!token) res.status(500).json({error: 'No token supplied'});

	try {
		req.decodedToken = jwt.verify(token, 'SECRETSECRETSECRET');
		next();
	} catch(err) {
		res.status(500).json({error: err.message});
	}
}

module.exports = {checkAuthToken};