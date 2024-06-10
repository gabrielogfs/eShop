const Product = require('../models/Product');

class productDAO {

    static async getProduct() {
        return await Product.find();
    };

    static async getProductById(id) {
        return await Product.findById(id);
    };

    static async createProduct(product) {
        return await Product.create(product);
    };

    static async updateProduct(id, updatedProduct) {
        return await Product.findByIdAndUpdate(id, updatedProduct);
    };

    static async deleteProduct(id) {
        return await Product.findByIdAndDelete(id);
    };
};

module.exports = productDAO;