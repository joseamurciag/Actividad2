const db = require('../config/config');

const Product = {};

// Obtener todos los productos
Product.findAll = (result) => {
  const sql = `
    SELECT p.id, p.name, p.description, p.price, p.stock, p.image, p.category,
           p.user_id, u.name AS user_name, u.lastname AS user_lastname,
           p.created_at, p.updated_at
    FROM products p
    INNER JOIN users u ON p.user_id = u.id
  `;
  db.query(sql, (err, products) => {
    if (err) {
      console.log('Error al listar productos: ', err);
      result(err, null);
    } else {
      console.log('Productos encontrados: ', products.length);
      result(null, products);
    }
  });
};

// Buscar producto por ID
Product.findById = (id, result) => {
  const sql = `
    SELECT p.id, p.name, p.description, p.price, p.stock, p.image, p.category,
           p.user_id, u.name AS user_name, u.lastname AS user_lastname,
           p.created_at, p.updated_at
    FROM products p
    INNER JOIN users u ON p.user_id = u.id
    WHERE p.id = ?`;
  db.query(sql, [id], (err, product) => {
    if (err) {
      console.log('Error al consultar producto: ', err);
      result(err, null);
    } else {
      result(null, product[0]);
    }
  });
};

// Crear producto
Product.create = (product, result) => {
  const sql = `
    INSERT INTO products(name, description, price, stock, image, category, user_id, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [
    product.name,
    product.description,
    product.price,
    product.stock,
    product.image,
    product.category,
    product.user_id,
    new Date(),
    new Date()
  ], (err, res) => {
    if (err) {
      console.log('Error al crear producto: ', err);
      result(err, null);
    } else {
      console.log('Producto creado: ', { id: res.insertId, ...product });
      result(null, { id: res.insertId, ...product });
    }
  });
};

// Actualizar producto
Product.update = (product, result) => {
  const sql = `
    UPDATE products 
    SET name = ?, description = ?, price = ?, stock = ?, image = ?, category = ?, updated_at = ?
    WHERE id = ?
  `;
  db.query(sql, [
    product.name,
    product.description,
    product.price,
    product.stock,
    product.image,
    product.category,
    new Date(),
    product.id
  ], (err, res) => {
    if (err) {
      console.log('Error al actualizar producto: ', err);
      result(err, null);
    } else {
      console.log('Producto actualizado: ', { id: product.id, ...product });
      result(null, { id: product.id, ...product });
    }
  });
};

// Eliminar producto
Product.delete = (id, result) => {
  const sql = `DELETE FROM products WHERE id = ?`;
  db.query(sql, [id], (err, res) => {
    if (err) {
      console.log('Error al eliminar producto: ', err);
      result(err, null);
    } else {
      console.log('Producto eliminado con id: ', id);
      result(null, res);
    }
  });
};

module.exports = Product;
