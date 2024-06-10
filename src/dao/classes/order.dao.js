const Order = require('../models/Order');

class orderDAO {

    static async getOrder() {
        return await Order.find();
    };

    static async getOrderById(id) {
        return await Order.findById(id);
    };

    static async createOrder(order) {
        return await Order.create(order);
    };

    static async updateOrder(id, updatedOrder) {
        return await Order.findByIdAndUpdate(id, updatedOrder);
    };

    static async deleteOrder(id) {
        return await Order.findByIdAndDelete(id);
    };
};

module.exports = orderDAO;