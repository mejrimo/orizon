const mongoose = require('mongoose');

// CREATE A SCHEMA SO THAT EVERY ELEMENT IN THE DB WILL HAVE THE INFORMATION YOU NEED
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "can't be blank"],
		match: [/^[a-zA-Z\sÀ-ÿ']+$/, 'is invalid'],
	},
});

module.exports = mongoose.model('Product', productSchema);
