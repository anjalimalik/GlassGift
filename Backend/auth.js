const jwt = require('jsonwebtoken');

function checkAuthToken(req, res, next) {
	return next();

	if (['/login', '/reset_password', '/confirm_password', '/confirm_account'].includes(req.originalUrl)) next();

	const token = req.get('Authorization');
	if (!token) return res.status(500).json({error: 'No token supplied'});

	try {
		req.decodedToken = jwt.verify(token, 'SECRETSECRETSECRET');
		next();
	} catch(err) {
		return res.status(500).json({error: err.message});
	}
}

module.exports = {checkAuthToken};