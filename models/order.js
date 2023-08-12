const mongoose = require('mongoose');

// CREATE A SCHEMA SO THAT EVERY ELEMENT IN THE DB WILL HAVE THE INFORMATION YOU NEED

const orderSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},

	products: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product',
				required: true,
			},
		},
	],

	orderDate: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

module.exports = mongoose.model('Order', orderSchema);
