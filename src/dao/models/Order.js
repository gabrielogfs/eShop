const mongoose = require('mongoose');

const productOrderSchema = new mongoose.Schema({
    name: { type: String, required: true}
})

const orderSchema = new mongoose.Schema({
    number: {type: Number, required: true},
    email: {type: mongoose.Schema.Types.ObjectId, ref: 'Email'},
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    products:[],
    totalPrice: { type: Number}
});

const Orders = mongoose.model('OrdersDB', orderSchema);

module.exports = Orders;