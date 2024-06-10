const User = require('../dao/models/User');
const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send('Usuário não encontrado.')
        }

        const hPassword = await bcrypt.compareSync(password, user.password)

        if (hPassword) {
            req.session.user = user;
            res.direct('/home');
        } else {
            res.status(404).send('Ocorreu um problema ao fazer login. Verifique seu e-mail e senha ou crie uma conta.')
        }
    } catch (error) {
        res.status(500).send('Falha em realizar login.');
    };
};

const login = (req, res) => {
    res.render('login');
};

const profile = async (req, res) => {
    try {

        if (!req.session.user) {
            res.redirect('/login');
        } else {
            const { first_name, last_name, email, age } = await req.session.user;
            res.render('perfil', { first_name, last_name, cpf, email, cep, address, number, complement });
        };
    } catch (error) {
        res.status(500).send('Falha ao apresentar perfil do usuário.');
    };
};

// ! API CEP

function clearCEPForm() {
    //Limpa valores do formulário de cep.
    document.getElementById('street').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('city').value=("");
    document.getElementById('state').value=("");
}

function meu_callback(value) {
if (!("erro" in value)) {
    //Atualiza os campos com os valores.
    document.getElementById('rua').value=(value.logradouro);
    document.getElementById('bairro').value=(value.bairro);
    document.getElementById('cidade').value=(value.localidade);
    document.getElementById('state').value=(value.state);
} //end if.
else {
    //CEP não Encontrado.
    clearCEPForm();
    alert("CEP não encontrado.");
}
}

function searchCEP(valor) {

var cep = valor.replace(/\D/g, '');

if (cep != "") {

    var cepValidate = /^[0-9]{8}$/;

    if(cepValidate.test(cep)) {

        document.getElementById('rua').value="...";
        document.getElementById('bairro').value="...";
        document.getElementById('cidade').value="...";
        document.getElementById('state').value="...";

        var script = document.createElement('script');

        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        document.body.appendChild(script);

    }
    else {
        clearCEPForm();
        alert("Formato de CEP inválido.");
    }
}
else {
    clearCEPForm();
}
};

module.exports = { loginUser, login, profile, searchCEP };
