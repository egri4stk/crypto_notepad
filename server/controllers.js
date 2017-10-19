'use strict';

const logController = (req, res, next) =>{
	console.log(req.method, req.url, req.params);//, req.headers);
	next();
}

const sessionController = (req, res, next) =>{
	if (req.headers['session-token'] !== '123456qwerty') {
    next({ statusCode: 401, message: 'Unauthorized' });
    return;
  }
  res['sessionToken'] = req.headers['session-token'];
  next();
}

const methodNotAllowedController = (req, res, next) => {
	next({statusCode: 405, message: 'Method Not Allowed'});
}

const handleError = (err, req, res, next) => {
  let { statusCode, message } = err;
  statusCode = statusCode || 500;
  message = message || 'Internal Server Error';
  res.status(statusCode).send(message);
};

const homeController = (req, res, next) =>{
	res.send('Home page ^_^');
}

module.exports = {
	logController : logController,
	sessionController : sessionController,
	methodNotAllowedController : methodNotAllowedController,
	handleError : handleError,
	homeController : homeController
}