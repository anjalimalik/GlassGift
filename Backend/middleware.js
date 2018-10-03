const createError = require('http-errors');

function ipFilter(req, res, next) {
    
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