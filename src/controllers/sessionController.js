const User = require('../dao/models/User');
const bcrypt = require('bcrypt');

const login = (req, res) => {
    res.render('login');
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        console.log("Usuário encontrado: ", user);

        if (!user) {
            return res.status(404).send('Usuário não encontrado.')
        }

        const hPassword = await bcrypt.compareSync(password, user.password)
        console.log('Result da comparação: ', hPassword)

        if (hPassword) {
            req.session.user = user;
            res.direct('/profile');
        } else {
            res.status(404).send('Ocorreu um problema ao fazer login. Verifique seu e-mail e senha ou crie uma conta.')
        }
    } catch (error) {
        res.status(500).send('Falha em realizar login.');
    };
};

const perfil = async (req, res) => {
    try {

        if (!req.session.user) {
            res.redirect('/login');
        } else {
            const { first_name, last_name, email } = await req.session.user;
            res.render('perfil', { first_name, last_name, cpf, email });
        };
    } catch (error) {
        res.status(500).send('Falha ao apresentar perfil do usuário.');
    };
};

const logout = async (req, res) => {
    req.session.destroy(err => {
        if(!err)
            res.send('Logout efetuado com sucesso.');
        else 
        res.send({status: 'Erro no logout', body: err});
    });
}

module.exports = { loginUser, login, perfil, logout };
