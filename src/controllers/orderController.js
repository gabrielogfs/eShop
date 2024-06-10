const Order = require('../dao/models/Order');
const Commerce = require('../dao/models/Product');
const User = require('../dao/models/User');
const orderDAO = require('../dao/classes/order.dao');


const getOrder = async (req, res) => {

    try {
        let orders = await Order.find();
        if (orders) {
            res.status(200).send({ status: 'success', result: orders });
        } else {
            res.status(404).send({ status: 'error', message: 'Nenhum pedido encontrado.' })
        }
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message })
    };
};

const getOrderById = async (req, res) => {

    try {
        let id = req.params.id;
        let order = await Order.findById(id);

        if (order) {
            res.status(200).send({ status: 'success', result: order });
        } else {
            res.status(404).send({ status: 'error', result: 'Pedido não encontrado.' })
        };
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message });
    };
};

const createOrder = async (req, res) => {

    try {
        const { user, commerce, products } = req.body;
        const resultUser = await User.findById(user);
        const resultCommerce = await Commerce.findById(commerce);
        let updatedOrder = resultCommerce.products.filter(product => products.includes(product._id));

        let sum = updatedOrder.reduce((acc, prev) => {
            acc + prev.price;
            return acc;
        }, 0);

        let orderNumber = 'ORD-' + Date.now() + Math.floor(Math.random() * 1000 + 1);
        let order = {
            number: orderNumber,
            commerce,
            user,
            status: 'pending',
            products: updatedOrder.map(product => product._id),
            total: sum
        }

        let orderResult = await Order.create(order);
        resultUser.orders.push(order._id);
        await resultUser.save();

        if (orderResult) {
            res.status(200).send({ status: 'success', result: orderResult })
        } else {
            res.status(404).send({ status: 'error', result: 'Não foi possível realizar o pedido.' });
        };
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message });
    };
};

const solveOrder = async (req, res) => {

    try {
        const { resolve } = req.query;
        let order = await Order.findById(req.params.id);
        order.status = resolve;
        await order.save(order._id, order);

        if (order) {
            res.status(200).send({ status: 'success', result: "Pedido Concluído." })
        } else {
            res.status(404).send({ status: 'error', message: 'Pedido não encontrado.' })
        };
    } catch (error) {
        res.status(400).send({ status: 'error', result: error.message })
    };
};


const updateOrder = async (req, res) => {

    try {
        const order = await orderDAO.updateOrder(req.params.id, req.body);
        if (order) {
            res.status(200).send({ status: 'success', result: order });
        } else {
            res.status(404).send({ status: 'error', message: 'Pedido não encontrado.' })
        }
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message });
    };
};

const deleteOrder = async (req, res) => {

    try {
        const order = await orderDAO.deleteOrder(req.params.id);

        if (order) {
            res.status(200).send({ status: 'success', result: order });
        } else {
            res.status(404).send({ status: 'error', message: 'Pedido não encontrado.' });
        }
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message })
    };
};


module.exports = { getOrder, getOrderById, createOrder, solveOrder, updateOrder, deleteOrder };