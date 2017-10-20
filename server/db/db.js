const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/crypto', { useMongoClient: true });

module.exports = mongoose;



