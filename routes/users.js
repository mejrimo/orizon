const express = require('express');
const router = express.Router();

// IMPORT USER MODEL
const User = require('../models/user');

// CUSTOM MIDDLEWARE TO SEARCH FOR THE USER
const getUser = require('../middlewares/getUser');
const usersPagination = require('../middlewares/usersPagination');

// BUILT-IN MIDDLEWARE TO MANAGE JSON FILES
router.use(express.json());

// GET ALL USERS
router.get('/', usersPagination, (req, res) => {
	res.json(res.users);
});

// GET ONE USER
router.get('/:id', getUser, (req, res) => {
	res.json(res.user);
});

// CREATE A NEW USER
router.post('/', async (req, res) => {
	try {
		const user = new User({
			name: req.body.name,
			surname: req.body.surname,
			email: req.body.email,
		});

		const newUser = await user.save();

		res.status(201).json(newUser);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// UPDATE USER
router.patch('/:id', getUser, async (req, res) => {
	try {
		const { name, surname, email } = req.body;

		if (name) {
			res.user.name = name;
		}

		if (surname) {
			res.user.surname = surname;
		}

		if (email) {
			res.user.email = email;
		}

		const updatedUser = await res.user.save();

		res.json(updatedUser);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// DELETE USER
router.delete('/:id', getUser, async (req, res) => {
	try {
		await res.user.deleteOne({ _id: req.params.id });

		res.json({ message: 'Deleted User' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
