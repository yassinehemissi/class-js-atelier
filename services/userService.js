const db = require('../database/database');

const createUser = async (req, res, next) => {
	if (req.method === 'GET') {
		res.render('users/user-create.twig', { error: false });
	} else {
		const { User } = await db();
		const { username, password, birthday } = req.body;
		const user = await User.create({ username, password, birthday });
		res.redirect('/user');
	}
}

const getUsers = async (req, res, next) => {
	const { User } = await db();
	const data = await User.findAll({});
	res.render('users/users-list.twig', { data });
}

const updateUser = async (req, res, next) => {
	const { User } = await db();
	const { id } = req.params;
	const { username, password, birthday } = req.body;
	await User.update({ username, password, birthday }, { where: { id } });
	res.redirect('/user');
}

const getUser = async (req, res, next) => {
	const { User } = await db();
	const { id } = req.params;
	const data = await User.findOne({ where: { id } });
	res.render('users/user.twig', { user: data, id });
}

const deleteUser = async (req, res, next) => {
	const { User } = await db();
	const { id } = req.params;
	console.log(id);
	await User.destroy({ where: { id } });
	res.redirect('/user');
}

module.exports = {
	getUsers,
	getUser,
	createUser,
	deleteUser,
	updateUser
}



