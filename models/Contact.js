const { DataTypes } = require('sequelize');

const Contact = (sequelize) => {
	const ContactModel = sequelize.define('contact', {
		fullName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		phone: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	});

	return ContactModel;
};

module.exports = Contact;
