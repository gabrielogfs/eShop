const mongoose = require('mongoose');
const { mongoUrl } = require('./config');

const connection = async () => {
    try {
        await mongoose.connect(mongoUrl)
        console.log('Conexão com MongoDB estabelecida com sucesso.')
    } catch (error) {
        console.error('Erro ao conectar-se ao MongoDB', error)
        process.exit(1)
    };
};

module.exports = connection