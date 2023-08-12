const Order = require('../models/order');

// FUNCTION TO FIND A SINGLE ORDER
async function getOrder(req, res, next) {
	let order;

	try {
		order = await Order.findById(req.params.id);

		if (!order) {
			return res.status(404).json({ message: 'Cannot find the order' });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}

	res.order = order;
	next();
}

module.exports = getOrder;
