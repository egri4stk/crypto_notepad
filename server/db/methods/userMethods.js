const User = require('../scheme/userSchema').User;

const createUser = (login, password, callback) =>{
	const user = new User({login: login, password: password});
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

module.exports = {
	createUser,
	loginUser
}