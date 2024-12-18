const yup = require("yup");


const validateProduct = (schema) => async (req, res, next) => {

	try {
		await schema.validate({
			body: req.body,
			query: req.query,
			params: req.params
		});
		next();
	} catch (err) {
		console.log(req.body)
		if (req.url.includes('/create')) {
			return res.render('product/product-create.twig', { errorMessage: err.message.replace('body.', '') })
		} else if (req.url.includes('/update')) {
			return res.redirect(`/products/update/${req.body.id}`)
		}
	}
}


const ProductSchema = yup.object({
	body: yup.object({
		name: yup.string().required(),
		price: yup.number().positive().required(),
		material: yup.string().optional().min(3).max(15)
	})
});


module.exports = { validateProduct, ProductSchema };
