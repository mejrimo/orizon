const express = require('express');
const router = express.Router();

// IMPORT USER, PRODUCT AND ORDER MODELS
const Order = require('../models/order');
const User = require('../models/user');
const Product = require('../models/product');

// CUSTOM MIDDLEWARE TO SEARCH FOR THE ORDER
const getOrder = require('../middlewares/getOrder');

// BUILT-IN MIDDLEWARE TO MANAGE JSON FILES
router.use(express.json());

// GET ALL ORDERS
router.get('/', async (req, res) => {
	try {
		const orders = await Order.find();

		res.json(orders);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// GET ONE ORDER
router.get('/:id', getOrder, (req, res) => {
	res.json(res.order);
});

// CREATE A NEW ORDER
router.post('/', async (req, res) => {
	// VERIFY THAT USER AND PRODUCTS EXIST
	try {
		const { userId, products } = req.body;

		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ message: 'Cannot find the user' });
		}

		const productsInfo = await Product.find({ _id: { $in: products.map((p) => p.product) } });

		if (productsInfo.length !== products.length) {
			return res.status(404).json({ message: 'Cannot find some products' });
		}

		const newOrder = new Order({
			user: userId,
			products: products.map((p) => ({ product: p.product })),
		});

		await newOrder.save();

		res.status(201).json(newOrder);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// UPDATE AN ORDER
router.patch('/:id', getOrder, async (req, res) => {
	try {
		const { userId, products } = req.body;

		if (userId) {
			const user = await User.findById(userId);

			if (!user) {
				return res.status(404).json({ message: 'Cannot find the user' });
			}

			res.order.user = user;
		}

		if (products) {
			const productsInfo = await Product.find({ _id: { $in: products.map((p) => p.product) } });

			if (productsInfo.length !== products.length) {
				return res.status(404).json({ message: 'Cannot find some products' });
			}

			res.order.products = products.map((p) => ({ product: p.product }));
		}

		const updatedOrder = await res.user.save();

		res.json(updatedOrder);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// DELETE AN ORDER
router.delete('/:id', getOrder, async (req, res) => {
	try {
		await res.order.deleteOne({ _id: req.params.id });

		res.json({ message: 'Deleted Order' });
	} catch (err) {
		err.status(500).json({ message: err.message });
	}
});

module.exports = router;
