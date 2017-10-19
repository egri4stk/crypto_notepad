const mongoose = require('mongoose');

const userScheme = mongoose.Schema({
    login: String,
    password: String
});

module.exports = {
	User : mongoose.model('Users',userScheme)
}