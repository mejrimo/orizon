const Order = require('../models/order');

async function ordersPagination(req, res, next) {
	let orders;
	try {
		const page = (req.query.page || 1) - 1;

		const perPage = req.query.perPage || 5;

		const orderDate = req.query.date ? new Date(req.query.date) : null;

		const productsId = req.query.products ? req.query.products.split(',') : [];

		const filter = {};

		if (orderDate) {
			filter.orderDate = orderDate;
		}

		if (productsId.length > 0) {
			const productObjectIds = productsId.map(
				(productId) => new mongoose.Types.ObjectId(productId)
			);
			filter['products.product'] = { $in: productObjectIds };
		}

		orders = await Order.find(filter)
			.skip(page * perPage)
			.limit(perPage);

		if (!orders) {
			return res.status(404).json({ message: 'Cannot find the orders' });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}

	res.orders = orders;
	next();
}

module.exports = ordersPagination;
