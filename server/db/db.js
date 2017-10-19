const mongoose = require('mongoose');
const User = require('./scheme/userScheme').User;

mongoose.connect('mongodb://localhost/crypto', { useMongoClient: true });

let db = mongoose.connection;

const createUser = (login, password) =>{
	let user = new User({login: login, password: password});
	user.save((err)=>{
		if (err) return handleError(err);
		console.log('User create: ' + login + password);
	})
}

const findUser 