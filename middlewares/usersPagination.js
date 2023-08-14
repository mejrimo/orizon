const User = require('../models/user');

// FUNCTION TO SET THE USERS PAGINATION
async function usersPagination(req, res, next) {
	let users;
	const page = (req.query.page || 1) - 1;
	const usersPerPage = req.query.perPage || 5;

	try {
		users = await User.find()
			.skip(page * usersPerPage)
			.limit(usersPerPage);

		if (!users) {
			return res.status(404).json({ message: 'Cannot find the users' });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}

	res.users = users;
	next();
}

module.exports = usersPagination;
