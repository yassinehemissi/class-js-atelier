const db = require('../database/database')
const { getIoServer } = require("../services/socketServer");


const getAllProducts = async (req, res) => {
	const { Product } = await db()
	const products = await Product.findAll()

	let averagePrice = 0;
	products.forEach((p) => averagePrice += p.price)
	averagePrice /= products.length
	const productsAboveAverage = products.filter((p) => p.price >= averagePrice)

	return res.render('product/product-list.twig', { products, averagePrice, productsAboveAverage })
}

const getProductsAverage = async () => {
	const { Product } = await db()
	const products = await Product.findAll()

	let averagePrice = 0;
	products.forEach((p) => averagePrice += p.price)
	averagePrice /= products.length
	return averagePrice
}

const getProductByName = async (req, res) => {
	const { Product } = await db()
	const { name } = req.params;
	const product = await Product.findOne({ where: { name } })
	if (!product) return res.redirect('/products')
	return res.render('product/product-one.twig', { product })
}

const createProduct = async (req, res) => {
	if (req.method == 'GET') {
		return res.render('product/product-create.twig')
	} else if (req.method == 'POST') {
		const { name, price, material } = req.body;
		const { Product } = await db()
		const product = await Product.create({
			name,
			price,
			material
		})
		
		getIoServer().emit('update', { average: await getProductsAverage() })
		return res.redirect('/products')
	}

}

const getUpdateProduct = async (req, res) => {
	console.log(req.params)
	const { id } = req.params;
	const { Product } = await db()
	const product = await Product.findOne({ where: { id } })


	return res.render('product/product-update.twig', { product })

}

const updateProduct = async (req, res) => {
	const { name, price, material, id } = req.body;
	const { Product } = await db()
	const product = await Product.update({
		name,
		price,
		material
	}, { where: { id } })
	getIoServer().emit('update', { average: await getProductsAverage() })

	return res.redirect('/products')
}

const deleteProduct = async (req, res) => {
	const { id } = req.params;
	const { Product } = await db()
	await Product.destroy({ where: { id } })
	getIoServer().emit('update', { average: await getProductsAverage() })

	return res.redirect('/products')
}

module.exports = { getAllProducts, getProductByName, createProduct, getUpdateProduct, updateProduct, deleteProduct }