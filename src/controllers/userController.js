const UserDAO = require('../dao/classes/usuario.dao');

const getUser =  async (req, res) => {
    try {
        const users = await UserDAO.getUser();

        if (users) {
            res.status(200).send({ status: 'success', result: users });
        } else {
            res.status(404).send({ status: 'error', message: 'Não foram encontrados usuários.' });
        };
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    };
};

const getUserbyId = async (req, res) => {

    try {
        const { id } = req.params;
        const user = await UserDAO.getUserbyId(id);

        if (user) {
            res.status(200).send({ status: 'success', result: user });
        } else {
            res.status(404).send({ status: 'error', message: 'Usuário não encontrado.' })
        }
    } catch (error) {
        res.send({ status: 'error', message: error.message });
    };
};

const createUser = async (req, res) => {

    try {
        const user = req.body;
        
        // const existingEmail = await UserDAO.getUsers({ email });
        // const existingCpf = await UserDAO.getUsers({ cpf });

        // if(!existingEmail) {
        //     return res.status(400).send('Email já cadastrado.');
        // };

        // if(!existingCpf) {
        //     return res.status(400).send('CPF já cadastrado.');
        // };
        
        const newUser = await UserDAO.createUser(user);
        res.status(200).redirect('/endereco');
    } catch (error) {
        res.send({ status: 'error', message: error.message });
    };
};

const updateUser = async (req, res) => {
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

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await UserDAO.deleteUser(id);

        if (user) {
            res.status(200).send({ status: 'success', result: user });
        } else {
            res.status(404).send({ status: 'error', message: 'Usuário não encontrado.' });
        }
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message });
    };
};


module.exports = { getUser, getUserbyId, createUser, updateUser, deleteUser }