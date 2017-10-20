const express = require('express');
const router = express.Router();
const path = require('path');
const {
	loginController,
	createAccountController,
	getAllTextsController,
	getTextController,
	keyController
} = require('./controllers');

router
	.post('/createAccount', createAccountController)
	.post('/login', loginController)
	.get('/getAllTexts', getAllTextsController)
	.get('/getText', getTextController)
	.get('/getSecretKey', keyController)
	.get('*', (req,res,next)=>{
		res.sendFile(path.normalize(__dirname+'/../client/index.html'));
	});


module.exports = router;