const mongoose = require('mongoose');

// CREATE A SCHEMA SO THAT EVERY ELEMENT IN THE DB WILL HAVE THE INFORMATION YOU NEED
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},

	surname: {
		type: String,
		required: true,
	},

	email: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('User', userSchema);
