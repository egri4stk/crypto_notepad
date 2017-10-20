const key = require('../config.json').key;
const jwt = require('jsonwebtoken');


const generateToken = function (obj){
	return jwt.sign(obj, key);
}

const decodeToken = function(token,callback){
		jwt.verify(token, key, function(err, decoded) {
	  	if(err){
	  		console.log(err);
	  		callback(err);
	  	}
	  	callback(null,decoded);
		});
}

module.exports ={
	generateToken,
	decodeToken
}