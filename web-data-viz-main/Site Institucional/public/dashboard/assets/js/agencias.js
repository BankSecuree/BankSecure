function exibirTabelaAgencias() {

    fetch(`/usuarios/exibirTabelaAgencias/${sessionStorage.GERENTE_USUARIO}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var lista = document.getElementById("tabela-agencia");
                var mensagem = document.createElement("p");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                lista.innerHTML = "";
                lista.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }
            resposta.json().then(function (resposta) {
                // console.log("Dados recebidos: ", JSON.stringify(resposta));
                var lista = document.getElementById("tabela-usuarios");
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];

                    var thNumero = document.createElement("th");
                    thNumero.innerHTML = i + 1;
                    thNumero.setAttribute("scope", "row");
                    var tdNome = document.createElement("td");
                    tdNome.innerHTML = publicacao.nome;
                    var tdEmpresa = document.createElement("td");
                    tdEmpresa.innerHTML = publicacao.empresa;
                    var tdFuncionarios = document.createElement("td");
                    tdFuncionarios.innerHTML = publicacao.funcionarios;
                    var tdInicio = document.createElement("td");
                    var dataInicio = new Date(publicacao.dataInicio)
                    dataInicio = `${dataInicio.getDate().toString().padStart(2, '0')}/${(dataInicio.getMonth() + 1).toString().padStart(2, '0')}/${dataInicio.getFullYear().toString()}`
                    tdInicio.innerHTML = dataInicio;
                    var tdButton = document.createElement("td");
                    tdButton.innerHTML = `<a onclick="excluirUsuario(${publicacao.idUsuario})" class="btn btn-danger btn-sm" title="Remove my profile image"><i
                    class="bi bi-trash"></i></a>`;
                    var tr = document.createElement("tr");
                    var tbody = document.createElement("tbody");

                    tr.appendChild(thNumero);
                    tr.appendChild(tdNome);
                    tr.appendChild(tdEmpresa);
                    tr.appendChild(tdFuncionarios);
                    tr.appendChild(tdInicio);
                    tr.appendChild(tdButton);
                    tbody.appendChild(tr);
                    lista.appendChild(tbody);

                }
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        // finalizarAguardar();
    });
}

function validar() {

    var ipt_apelido = iptApelido.value;
    var cnpj = iptCnpj.value;
    var cep = iptCep.value;
    var logradouro = iptLogradouro.value
    var numero = iptNumero.value


    if (ipt_apelido == "") {
        msg_alertas.style.display = "block"
        Erro = document.getElementById("mensagemErro")
        Erro.classList.add("alerta")
        mensagemErro.innerHTML = `O Apelido não pode ser vazio`
    }
    else if (cnpj == "") {
        msg_alertas.style.display = "block"
        Erro = document.getElementById("mensagemErro")
        Erro.classList.add("alerta")
        mensagemErro.innerHTML = `O CNPJ não pode ser vazio`
    }
    else if (cep == "") {
        msg_alertas.style.display = "block"
        Erro = document.getElementById("mensagemErro")
        Erro.classList.add("alerta")
        mensagemErro.innerHTML = `O CEP não pode ser vazio`
    }
    else if (logradouro == "") {
        msg_alertas.style.display = "block"
        Erro = document.getElementById("mensagemErro")
        Erro.classList.add("alerta")
        mensagemErro.innerHTML = `O Logradouro não pode ser vazio`
    }
    else if (numero == "") {
        msg_alertas.style.display = "block"
        Erro = document.getElementById("mensagemErro")
        Erro.classList.add("alerta")
        mensagemErro.innerHTML = `O Número não pode ser vazio`
    }

    if (isNaN(numero)) {
        msg_alertas.style.display = "block"
        Erro = document.getElementById("mensagemErro")
        Erro.classList.add("erro")
        mensagemErro.innerHTML = `O número não pode ter letras`
        
    }
}

function eliminarNumeros(id) {
    const input = document.getElementById(id)
    var listaLetras = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    // console.log(input)
    // console.log(ultima_letra)
    for (var i = 0; i <= 9; i++) {
        if (input.value[input.value.length - 1] == Number(listaLetras[i]) && input.value[input.value.length - 1] != ' ') {
            msg_alertas.style.display = "block"
            Erro = document.getElementById("mensagemErro")
            Erro.classList.add("erro")
            mensagemErro.innerHTML = `Este campo não pode ter Números`
            input.value = ''
            setTimeout(desaparecerCard, 5000);
        }
    }
    for (var letra = 0; letra <= input.value.length - 1; letra++) {
        if (isNaN(input.value[letra]) == false && input.value[letra] != ' ') {
            msg_alertas.style.display = "block"
            Erro = document.getElementById("mensagemErro")
            Erro.classList.add("erro")
            mensagemErro.innerHTML = `Este campo não pode ter Números`
            input.value = ''
            setTimeout(desaparecerCard, 5000);
        }
    }
}

function eliminarLetras(id) {
    const input = document.getElementById(id)
    var listaLetras = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@;,?|{}[]~^'
    // console.log(input)
    // console.log(ultima_letra)
    for (var i = 0; i <= 62; i++) {
        if (input.value[input.value.length - 1] == listaLetras[i]) {
            msg_alertas.style.display = "block"
            Erro = document.getElementById("mensagemErro")
            Erro.classList.add("erro")
            mensagemErro.innerHTML = `Este campo não pode ter Letras`
            input.value = ''
            setTimeout(desaparecerCard, 5000);
        }
        for (var letra = 0; letra <= input.value.length - 1; letra++) {
            if (input.value[letra] == listaLetras[i]) {
                msg_alertas.style.display = "block"
                Erro = document.getElementById("mensagemErro")
                Erro.classList.add("erro")
                mensagemErro.innerHTML = `Este campo não pode ter Letras`
                input.value = ''
                setTimeout(desaparecerCard, 5000);
            }
        }
    }

}

function mascaraCnpj() {
    var tamanhoCnpj = iptCnpj.value.length

    if (tamanhoCnpj == 2) {
        iptCnpj.value += '.'
    } if (tamanhoCnpj == 6) {
        iptCnpj.value += '.'
    } if (tamanhoCnpj == 10) {
        iptCnpj.value += '/'
    } if (tamanhoCnpj == 15) {
        iptCnpj.value += '-'
    }
}
function mascaraCep() {
    var tamanhoCep = iptCep.value.length

    if (tamanhoCep == 5) {
        iptCep.value += '-'
    }
}

function desaparecerCard() {
    msg_alertas.style.display = "none"
}


function cadastrarAgencia() {
    validar();

    setTimeout(desaparecerCard, 4000);
}  
