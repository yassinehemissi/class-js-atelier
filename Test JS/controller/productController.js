const express = require("express");
const router = express.Router();

const { getAllProducts, getProductByName, createProduct, getUpdateProduct, updateProduct, deleteProduct } = require("../services/productService")
const { validateProduct, ProductSchema } = require("../middleware/productValidator");


// Get all products
router.get('/', getAllProducts)

// Get the create product page 
router.get('/create', createProduct)
router.post("/create", validateProduct(ProductSchema), createProduct)


// Get a prroduct by name 
router.get('/one/:name', getProductByName)

router.post("/update", validateProduct(ProductSchema), updateProduct)
router.get('/update/:id', getUpdateProduct)
router.get("/delete/:id", deleteProduct)



module.exports = router;


