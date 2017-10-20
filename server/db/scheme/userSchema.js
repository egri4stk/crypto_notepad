const mongoose = require('mongoose');

const userScheme = mongoose.Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    secret: String
});

module.exports = {
	User : mongoose.model('Users',userScheme)
}