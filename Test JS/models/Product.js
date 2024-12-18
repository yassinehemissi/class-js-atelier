const { DataTypes } = require('sequelize');

const Product = (sequelize) => {
	const ProductModel = sequelize.define('Product', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		material: {
			type: DataTypes.STRING,
			allowNull: true
		}
	});

	
	return ProductModel;
};

module.exports = Product;
