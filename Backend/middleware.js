const createError = require('http-errors');
const db = require('./database');
const rootRoutes = require('./routes');
const email = require('./email');

async function ipFilter(req, res, next) {
    const userId = req.body ? req.body.userId : req.params.userId;
    const pastIps = await db.get('UserIps', ['ip'], `userId = ${userId}`);

    if (!pastIps.includes(req.ip)) {
    	email.sendIPemail(req.body.email, req.ip);
    	await db.insert('UserIps', ['userId', 'ip'], [req.headers['userId'], req.ip]);
    } else next();
}

function error(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
}

function fourOhFour(req, res, next) {
	next(createError(404));
}

module.exports = {ipFilter, error, fourOhFour};