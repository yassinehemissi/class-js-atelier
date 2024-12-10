const { DataTypes } = require('sequelize');

const User = (sequelize) => {
	const UserModel = sequelize.define('user', {
		username: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		birthday:{
			type: DataTypes.DATE,
			allowNull: true
		}
	});

	return UserModel;
};

module.exports = User;
