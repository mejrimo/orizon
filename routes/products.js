const express = require('express');
const router = express.Router();

// IMPORT PRODUCT MODEL
const Product = require('../models/product');

// CUSTOM MIDDLEWARE TO SEARCH FOR THE PRODUCT
const getProduct = require('../middlewares/getProduct');

// BUILT-IN MIDDLEWARE TO MANAGE JSON FILES
router.use(express.json());

// GET ALL PRODUCTS
router.get('/', async (req, res) => {
	try {
		const products = await Product.find();

		res.json(products);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// GET ONE PRODUCT
router.get('/:id', getProduct, (req, res) => {
	res.json(res.product);
});

// CREATE A NEW PRODUCT
router.post('/', async (req, res) => {
	try {
		const product = new Product({
			name: req.body.name,
		});

		const newProduct = await product.save();

		res.status(201).json(newProduct);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// UPDATE A PRODUCT
router.patch('/:id', getProduct, async (req, res) => {
	try {
		const { name } = req.body;

		if (name) {
			res.product.name = name;
		}

		const updatedProduct = await res.product.save();

		res.json(updatedProduct);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// DELETE A PRODUCT
router.delete('/:id', getProduct, async (req, res) => {
	try {
		await res.product.deleteOne({ _id: req.params.id });

		res.json({ message: 'Deleted Product' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
