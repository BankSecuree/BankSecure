function exibirTabelaUsuarios() {
    var lista = document.getElementById("tabela-usuarios");
    var trColunas = document.createElement("tr");
    var thead = document.createElement("thead");
    var thId = document.createElement("th");
    thId.setAttribute("scope", "row");
    thId.innerHTML = "#";
    var thNome = document.createElement("th");
    thNome.setAttribute("scope", "row");
    thNome.innerHTML = "Nome";
    var thEmpresa = document.createElement("th");
    thEmpresa.setAttribute("scope", "row");
    thEmpresa.innerHTML = "Empresa";
    var thDataInicio = document.createElement("th");
    thDataInicio.setAttribute("scope", "row");
    thDataInicio.innerHTML = "Data de Início";
    var thExcluir = document.createElement("th");
    thExcluir.setAttribute("scope", "row");
    thExcluir.innerHTML = "Excluir";

    trColunas.appendChild(thId);
    trColunas.appendChild(thNome);
    trColunas.appendChild(thEmpresa);
    trColunas.appendChild(thDataInicio);
    trColunas.appendChild(thExcluir);
    thead.appendChild(trColunas);
    lista.appendChild(thead);

    fetch(`/usuarios/exibirTabelaUsuarios/${sessionStorage.ID_USUARIO}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var lista = document.getElementById("tabela-usuarios");
                var mensagem = document.createElement("p");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                lista.innerHTML = "";
                lista.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }
            resposta.json().then(function (resposta) {
                for (let i = 0; i < resposta.length; i++) {
                    var lista = document.getElementById("tabela-usuarios");
                    var publicacao = resposta[i];

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


function excluirUsuario(idUsuario) {
    console.log(`Excluindo usuário ${idUsuario} funcionando `)
}

function obterLogin() {
    iptLogin.value = iptEmail.value;
}

function obterDadosCNPJ() {
    fetch(`https://publica.cnpj.ws/cnpj/${iptCnpj.value}`)
        .then(data => {
            return data.json();
        })
        .then(post => {

            dadosCNPJ = post;
            console.log(dadosCNPJ)

            iptRazaoSocial.value = dadosCNPJ.razao_social;;
            iptLogradouro.value = `${dadosCNPJ.estabelecimento.tipo_logradouro} ${dadosCNPJ.estabelecimento.logradouro}`;
            iptNumLogradouro.value = dadosCNPJ.estabelecimento.numero;
            iptCEP.value = dadosCNPJ.estabelecimento.cep;

        })
        .catch(error => {
            console.log("CNPJ não localizado na base de dados!")
        })

}

function cadastrarEmpresaGerente() {

    var cnpjVar = iptCnpj.value;
    var razaoSocialVar = iptRazaoSocial.value;
    var logradouroVar = iptLogradouro.value;
    var numLogradouroVar = iptNumLogradouro.value;
    var cepVar = iptCEP.value;
    var telefoneVar = iptTelefone.value;
    var nomeCompletoVar = iptNomeCompleto.value;
    var cpfVar = iptCPF.value;
    var celularVar = iptCelular.value;
    var nascimentoVar = iptNascimento.value;
    var cargoVar = iptCargo.value;
    var emailVar = iptEmail.value;
    var senhaVar = iptSenha.value;
    var dataInicioVar = new Date();
    dataInicioVar = `${dataInicioVar.getFullYear().toString()}-${(dataInicioVar.getMonth() + 1).toString().padStart(2, '0')}-${dataInicioVar.getDate().toString().padStart(2, '0')}`
    var fkGerenteVar;
    if (sessionStorage.GERENTE_USUARIO == "null") {
        fkGerenteVar = 1;
    } else {
        fkGerenteVar = sessionStorage.GERENTE_USUARIO;
    }


    // Enviando o valor da nova input
    fetch("/usuarios/cadastrarEmpresaGerente", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js

            cnpjServer: cnpjVar,
            razaoSocialServer: razaoSocialVar,
            logradouroServer: logradouroVar,
            numLogradouroServer: numLogradouroVar,
            cepServer: cepVar,
            telefoneServer: telefoneVar,
            nomeCompletoServer: nomeCompletoVar,
            cpfServer: cpfVar,
            celularServer: celularVar,
            nascimentoServer: nascimentoVar,
            cargoServer: cargoVar,
            fkGerenteServer: fkGerenteVar,
            emailServer: emailVar,
            senhaServer: senhaVar,
            dataInicioServer: dataInicioVar

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
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        // finalizarAguardar();
    });

    return false;
}


function exibirCadastroEmpresa() {
    if (sessionStorage.ID_USUARIO != 1) {
        iptCnpj.value = sessionStorage.CNPJ_EMPRESA;
        iptCnpj.setAttribute('disabled','');
        obterDadosCNPJ()
        iptRazaoSocial.setAttribute('disabled','');
        iptCEP.setAttribute('disabled','');
        iptLogradouro.setAttribute('disabled','');
        iptNumLogradouro.setAttribute('disabled','');
        iptTelefone.value = sessionStorage.TELEFONE_EMPRESA;
        iptTelefone.setAttribute('disabled','');

    }
}
