const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true},
    category: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    promo: {type: Boolean},
    serial: {type: String}
});

const Product = mongoose.model('ProductsDB', productSchema);

module.exports = Product;