const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Rutas protegidas por token
router.get('/', verifyToken, authorizeRoles(['admin', 'vendedor']), productController.getAllProducts);
router.get('/:id', verifyToken, authorizeRoles(['admin', 'vendedor']), productController.getProductById);
router.post('/create', verifyToken, authorizeRoles(['admin', 'vendedor']), productController.createProduct);
router.put('/:id', verifyToken, authorizeRoles(['admin', 'vendedor']), productController.updateProduct);
router.delete('/delete/:id', verifyToken, authorizeRoles(['admin']), productController.deleteProduct);

module.exports = router;
