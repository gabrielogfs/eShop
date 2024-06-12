const productDAO = require('../dao/classes/product.dao');

const getProduct = async (req, res) => {

    try {
        let product = await productDAO.getProduct();

        if (product) {
          res.status(200).render('produtos', { product })
        } else {
            res.status(404).send({ status: 'error', message: 'Não foram encontrados produtos.' });
        }
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message });
    };
};

const getProductById = async (req, res) => {

    try {
        let id = req.params.id;
        let product = await productDAO.getProductById(id);

        if (product) {
            res.status(200).send({ status: 'success', result: product });
        } else {
            res.status(404).send({ status: 'error', message: 'Produto não encontrado.' });
        };
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message });
    };
};

const createProduct = async (req, res) => {

    try {
        let product = req.body;
        let createdProduct = await productDAO.createProduct(product);

        if (createdProduct) {
            res.status(200).send({ status: 'success', result: createdProduct });
        } else {
            res.status(500).send({ status: 'error', message: 'Erro ao criar produto: server.' });
        }
    } catch (error) {
        return res.status(400).send({ status: 'error', message: error.message });
    };
};

const updateProduct = async (req, res) => {

    try {
        let id = req.params.id;
        let product = req.body;
        let updatedProduct = await productDAO.updateProduct(id, product);

        if (updatedProduct) {
            res.status(200).send({ status: 'success', result: updatedProduct });
        } else {
            res.status(404).send({ status: 'error', message: 'Produto não encontrado.' });
        }
    } catch (error) {
        return res.status(400).send({ status: 'error', message: error.message });
    };
};

const deleteProduct = async (req, res) => {

    try {
        let id = req.params.id;
        let deletedProduct = await productDAO.deleteProduct(id);

        if (deletedProduct) {
            res.status(200).send({ status: 'success', result: deletedProduct });
        } else {
            res.status(404).send({ status: 'error', message: 'Produto não encontrado.' });
        };
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message });
    };
};

// const getProductPage = async (req, res) => {
//     try {
//         let produtos = await productDAO.getProduct();
//         res.render('produtos', { produtos });
//     } catch (error) {
//         res.status(500).send('Erro ao carregar produtos.')
//     };
// };

module.exports = { getProduct, getProductById, createProduct, updateProduct, deleteProduct };