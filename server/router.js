const express = require('express');
const router = express.Router();
const path = require('path');
const {
	logController,
	sessionController,
	methodNotAllowedController,
	handleError,
	homeController
} = require('./controllers');

router
	.get('/home', homeController)
	.get('*', (req,res,next)=>{
		res.sendFile(path.normalize(__dirname+'/../client/index.html'));
	})

module.exports = router;