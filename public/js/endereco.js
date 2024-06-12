function clearCEPForm() {
    document.getElementById('street').value=("");
    document.getElementById('district').value=("");
    document.getElementById('city').value=("");
    document.getElementById('state').value=("");
}

function meu_callback(value) {
if (!("erro" in value)) {
    //Atualiza os campos com os valores.
    document.getElementById('street').value=(value.logradouro);
    document.getElementById('district').value=(value.bairro);
    document.getElementById('city').value=(value.localidade);
    document.getElementById('state').value=(value.uf);
}
else {
    clearCEPForm();
    alert("CEP não encontrado.");
}
}

function searchCEP(valor) {

var cep = valor.replace(/\D/g, '');

if (cep != "") {

    var cepValidate = /^[0-9]{8}$/;

    if(cepValidate.test(cep)) {

        document.getElementById('street').value="...";
        document.getElementById('district').value="...";
        document.getElementById('city').value="...";
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