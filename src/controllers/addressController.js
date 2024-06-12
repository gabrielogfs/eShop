const UserDAO = require('../dao/classes/usuario.dao');

const renderAddr = (req, res) => {
    res.render('endereco');
};

const createAddress = async (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    try {
        const user = await UserDAO.updateUser(id, updatedUser);
        if (user) {
            res.status(200).send({ status: 'success', result: user });
        } else {
            res.status(404).send({ status: 'error', message: 'Usuário não encontrado.' });
        };
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message });
    };
};

module.exports = { renderAddr, createAddress }