'use strict';

const userMethods = require('./db/methods/userMethods');
const textMethods = require('./db/methods/textMethods');
const jwt = require('./service');
const aesOfb = require('./crypto');

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

const createAccountController = (req, res, next) =>{
	userMethods.createUser(req.body.login, req.body.password, (err)=>{
		if(!err){
			res.send({err:null,msg:'User created!'});
			return;
		}
		handleError(err, req, res, next);
	});
}

const loginController = (req, res, next) => {
	userMethods.loginUser(req.body.login, req.body.password, (err, data)=>{
		if(!err){	
			const token = jwt.generateToken({login: data[0].login})
			res.send({err:null,msg:'Login success!', token: token});
			return;
		}
		handleError(err, req, res, next);
	});
}

const getAllTextsController = (req, res, next) => {
	textMethods.getTexts((err,data)=>{
		if(!err){
			res.send({err:null,texts:data});
			return;
		}
		handleError(err, req, res, next);
	});
	
}

const keyController = (req, res, next) => {
	const token = req.query.token;
	jwt.decodeToken(token, (err,decode)=>{
		if(!err){
			const user = decode.login;
			userMethods.getUserSecret(user, (err, key)=>{
				if(!err){
					res.send({err:null,key:key});
					return;
				}
				handleError(err, req, res, next);
				return;
			});
			return;
		}
		handleError(err, req, res, next);
	});

}

const getTextController = (req,res,next) =>{
	const id = req.query.id;
	const token = req.query.token;

	jwt.decodeToken(token, (err,decode)=>{
		if(!err){
			const user = decode.login;
			userMethods.getUserSecret(user, (err, key)=>{
				if(!err){
					textMethods.getText(id,(err,data)=>{
						if(!err){
							const encryptData = aesOfb.encryptText(data,key);
							res.send({err:null,text:encryptData});
							return;
						}
						handleError(err, req, res, next);
						return;
					});
					return;
				}
				handleError(err, req, res, next);
				return;

			});
			return;
		}
		handleError(err, req, res, next);
	});
	 
}

module.exports = {
	logController,
	sessionController,
	methodNotAllowedController,
	handleError,
	homeController,
	createAccountController,
	loginController,
	getAllTextsController,
	getTextController,
	keyController
}