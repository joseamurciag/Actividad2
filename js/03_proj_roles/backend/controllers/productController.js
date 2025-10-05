const Product = require('../models/product');

module.exports = {
  getAllProducts(req, res) {
    Product.findAll((err, products) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al listar productos',
          error: err
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Lista de productos',
        data: products
      });
    });
  },

  getProductById(req, res) {
    const id = req.params.id;
    Product.findById(id, (err, product) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al consultar el producto',
          error: err
        });
      }
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Producto encontrado',
        data: product
      });
    });
  },

  createProduct(req, res) {
    const product = req.body;
    product.user_id = req.user.id; // Se asocia al usuario logueado

    Product.create(product, (err, data) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al crear el producto',
          error: err
        });
      }
      return res.status(201).json({
        success: true,
        message: 'Producto creado correctamente',
        data: data
      });
    });
  },

  updateProduct(req, res) {
    const product = req.body;
    product.id = req.params.id;

    Product.update(product, (err, data) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al actualizar el producto',
          error: err
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Producto actualizado',
        data: data
      });
    });
  },

  deleteProduct(req, res) {
    const id = req.params.id;
    Product.delete(id, (err, data) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al eliminar el producto',
          error: err
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Producto eliminado',
        data: data
      });
    });
  }
};
