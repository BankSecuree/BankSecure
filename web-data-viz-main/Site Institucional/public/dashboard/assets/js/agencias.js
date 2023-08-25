var temErro = false;

function exibirTabelaAgencias() {

    var lista = document.getElementById("tabela-agencias");
    var trColunas = document.createElement("tr");
    var thead = document.createElement("thead");
    var thId = document.createElement("th");
    thId.setAttribute("scope", "row");
    thId.innerHTML = "#";
    var thEmpresa = document.createElement("th");
    thEmpresa.setAttribute("scope", "row");
    thEmpresa.innerHTML = "Empresa";
    var thCnpj = document.createElement("th");
    thCnpj.setAttribute("scope", "row");
    thCnpj.innerHTML = "CNPJ";
    var thFuncionarios = document.createElement("th");
    thFuncionarios.setAttribute("scope", "row");
    thFuncionarios.innerHTML = "Funcionários";
    var thCaixaEletronico = document.createElement("th");
    thCaixaEletronico.setAttribute("scope", "row");
    thCaixaEletronico.innerHTML = "Caixas Eletrônicos";
    var thExcluir = document.createElement("th");
    thExcluir.setAttribute("scope", "row");
    thExcluir.innerHTML = "Excluir";

    trColunas.appendChild(thId);
    trColunas.appendChild(thEmpresa);
    trColunas.appendChild(thCnpj);
    trColunas.appendChild(thFuncionarios);
    trColunas.appendChild(thCaixaEletronico);
    if (sessionStorage.GERENTE_USUARIO == "null") {
        var thExcluir = document.createElement("th");
        thExcluir.setAttribute("scope", "row");
        thExcluir.innerHTML = "Excluir";
        trColunas.appendChild(thExcluir);
    }
    thead.appendChild(trColunas);
    lista.appendChild(thead);
    fetch(`/usuarios/exibirTabelaAgencias/${sessionStorage.ID_USUARIO}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var lista = document.getElementById("tabela-agencias");
                var mensagem = document.createElement("p");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                lista.innerHTML = "";
                lista.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }
            resposta.json().then(function (resposta) {
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];
                    var lista = document.getElementById("tabela-agencias");

                    var thNumero = document.createElement("th");
                    thNumero.innerHTML = i + 1;
                    thNumero.setAttribute("scope", "row");
                    var tdNome = document.createElement("td");
                    tdNome.innerHTML = publicacao.nome;
                    var tdEmpresa = document.createElement("td");
                    tdEmpresa.innerHTML = publicacao.empresa;
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
                    if (sessionStorage.GERENTE_USUARIO == "null") {
                        var tdFuncionarios = document.createElement("td");
                        tdFuncionarios.innerHTML = publicacao.funcionarios;
                        tr.appendChild(tdFuncionarios);
                    }
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
    var logradouro = iptLogradouro.value;
    var numero = iptNumero.value;

    if (ipt_apelido == "") {
        msg_alertas.style.display = "block"
        Erro = document.getElementById("mensagemErro")
        Erro.classList.add("alerta")
        mensagemErro.innerHTML = `O Apelido não pode ser vazio`
        temErro = true;
    }
    else if (cnpj == "") {
        msg_alertas.style.display = "block"
        Erro = document.getElementById("mensagemErro")
        Erro.classList.add("alerta")
        mensagemErro.innerHTML = `O CNPJ não pode ser vazio`
        temErro = true;
    }
    else if (cep == "") {
        msg_alertas.style.display = "block"
        Erro = document.getElementById("mensagemErro")
        Erro.classList.add("alerta")
        mensagemErro.innerHTML = `O CEP não pode ser vazio`
        temErro = true;
    }
    else if (logradouro == "") {
        msg_alertas.style.display = "block"
        Erro = document.getElementById("mensagemErro")
        Erro.classList.add("alerta")
        mensagemErro.innerHTML = `O Logradouro não pode ser vazio`
        temErro = true;
    }
    else if (numero == "") {
        msg_alertas.style.display = "block"
        Erro = document.getElementById("mensagemErro")
        Erro.classList.add("alerta")
        mensagemErro.innerHTML = `O Número não pode ser vazio`
        temErro = true;
    }

    if (isNaN(numero)) {
        msg_alertas.style.display = "block"
        Erro = document.getElementById("mensagemErro")
        Erro.classList.add("erro")
        mensagemErro.innerHTML = `O número não pode ter letras`
        temErro = true;
    }
}

function eliminarNumeros(id) {
    const input = document.getElementById(id)
    var listaLetras = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

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
    desaparecerCard();

    if (temErro == false) {
        var agenciaApelidoVar = iptApelido.value;
        var agenciaCNPJVar = iptCnpj.value;
        var agenciaCEPVar = iptCep.value;
        var agenciaLogradouroVar = iptLogradouro.value;
        var agenciaNumeroVar = iptNumero.value;
        var agenciaTelefoneVar = iptTelefone.value;

        // Enviando o valor da nova input
        fetch("/usuarios/cadastrarAgencia", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                agenciaApelidoServer: agenciaApelidoVar,
                agenciaCnpjServer: agenciaCNPJVar,
                agenciaCepServer: agenciaCEPVar,
                agenciaLogradouroServer: agenciaLogradouroVar,
                agenciaNumeroServer: agenciaNumeroVar,
                agenciaTelefoneServer: agenciaTelefoneVar,

            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                // cardErro.style.display = "block";

                alert("Cadastro realizado com sucesso!");

                window.location = "conta_usuarios.html";


                // limparFormulario();
                // finalizarAguardar();
            } else {
                alert("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            // finalizarAguardar();
        });

        return false;

    }
    else{
        msg_alertas.style.display += "block"
        Erro = document.getElementById("mensagemErro")
        Erro.classList.add("error")
        mensagemErro.innerHTML += `Corrija seus erros para prosseguir`
        temErro = true;
    }
}  
