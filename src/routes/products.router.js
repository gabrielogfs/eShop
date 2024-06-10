const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productController');

router.get('/', productsController.getProduct);
router.get('/:id', productsController.getProductById);
router.post('/', productsController.createProduct);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;