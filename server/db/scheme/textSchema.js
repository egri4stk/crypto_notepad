const mongoose = require('mongoose');

const textSchema = mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: String,
    text: String
});

module.exports = {
	Text : mongoose.model('Texts',textSchema)
}