const Product = require('../models/product');

// FUNCTION TO FIND A SINGLE PRODUCT
async function getProduct(req, res, next) {
	let product;

	try {
		product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: 'Cannot find the product' });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}

	res.product = product;
	next();
}

module.exports = getProduct;
