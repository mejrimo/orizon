const mongoose = require('mongoose');

// LIBRARY TO ADD UNIQUE VALIDATION
const uniqueValidator = require('mongoose-unique-validator');

// CREATE A SCHEMA SO THAT EVERY ELEMENT IN THE DB WILL HAVE THE INFORMATION YOU NEED
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "can't be blank"],
		match: [/^[a-zA-Z\sÀ-ÿ']+$/, 'is invalid'],
	},

	surname: {
		type: String,
		required: [true, "can't be blank"],
		match: [/^[a-zA-Z\sÀ-ÿ']+$/, 'is invalid'],
	},

	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: [true, "can't be blank"],
		match: [/\S+@\S+\.\S+/, 'is invalid'],
	},
});

userSchema.plugin(uniqueValidator, { message: 'already taken' });

module.exports = mongoose.model('User', userSchema);
