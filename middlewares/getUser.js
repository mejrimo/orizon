const User = require('../models/user');

// FUNCTION TO FIND A SINGLE USER
async function getUser(req, res, next) {
	let user;
	try {
		user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: 'Cannot find the user' });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}

	res.user = user;
	next();
}

module.exports = getUser;
