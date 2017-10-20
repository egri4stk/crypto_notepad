const User = require('../scheme/textSchema').Text;

const getTexts = (callback) =>{
	User.find({},'id name', (err, data) => {
		if(err){
			callback(err);
			return;
		}
		if(!data[0]){
			callback({statusCode:405, message:'no texts'});
			return;
		}

		callback(null,data);
	});
}

const getText = (id,callback) =>{
	User.find({id:id},'text', (err, data) => {
		if(err){
			callback(err);
			return;
		}
		if(!data[0]){
			callback({statusCode:405, message:'no texts'});
			return;
		}

		callback(null,data[0].text);
	});
}

module.exports = {
	getTexts,
	getText
}