const mongoose = require('mongoose');

// CREATE A SCHEMA SO THAT EVERY ELEMENT IN THE DB WILL HAVE THE INFORMATION YOU NEED
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Product', productSchema);
