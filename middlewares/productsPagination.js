const Product = require('../models/product');

// FUNCTION TO SET THE PRODUCTS PAGINATION
async function productsPagination(req, res, next) {
	let products;
	const page = (req.query.page || 1) - 1;
	const productsPerPage = req.query.perPage || 5;

	try {
		products = await Product.find()
			.skip(page * productsPerPage)
			.limit(productsPerPage);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}

	res.products = products;
	next();
}

module.exports = productsPagination;
