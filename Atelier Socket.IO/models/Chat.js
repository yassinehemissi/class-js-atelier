const { DataTypes } = require('sequelize');

const Chat = (sequelize) => {
	const ChatModel = sequelize.define('chat', {
		message: {
			type: DataTypes.STRING,
			allowNull: false
		},
		sender: {
			type: DataTypes.STRING,
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false
		}
	});

	return ChatModel;
};

module.exports = Chat;
