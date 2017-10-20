const User = require('../scheme/userSchema').User;
const uuidv4 = require('uuid/v4');

const createUser = (login, password, callback) =>{
	const key_str = uuidv4();
	const user = new User({login: login, password: password, secret: key_str});
	user.save((err)=>{
		if (err) {
			callback(err);
			return;
		}
		console.log('User create: ' + login + password);
		callback(null);
	})
}

const loginUser = (login, password, callback) =>{
	User.find({'login':login}, (err, data) => {
		if(err){
			callback(err);
			return;
		}
		if(!data[0]){
			callback({statusCode:405, message:'no profile'});
			return;
		}
		callback(null,data);
	});
}

const getUserSecret = (login, callback) =>{
	User.find({'login':login},'secret', (err, data) => {
		if(err){
			callback(err);
			return;
		}
		if(!data[0]){
			callback({statusCode:405, message:'no profile'});
			return;
		}
		callback(null,data[0].secret);
	});
}

module.exports = {
	createUser,
	loginUser,
	getUserSecret
}