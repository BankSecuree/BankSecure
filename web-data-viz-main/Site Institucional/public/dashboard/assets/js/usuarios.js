function exibirTabelaUsuarios() {

    fetch(`/usuarios/exibirTabelaUsuarios/${sessionStorage.GERENTE_USUARIO}`).then(function (resposta) {
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
                // console.log("Dados recebidos: ", JSON.stringify(resposta));
                var lista = document.getElementById("tabela-usuarios");
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];

                    var thNumero = document.createElement("th");
                    thNumero.innerHTML = i+1;
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


function excluirUsuario(idUsuario) {
    console.log( `Excluindo usuário ${idUsuario} funcionando `)
}

function cadastrarEmpresaGerente() {

    var cnpjVar = iptCNPJ.value;
    var razaoSocialVar = iptRazaoSocial.value;
    var nomeFantasiaVar = iptNomeFantasia.value;
    var logradouroVar = iptLogradouro.value;
    var numLogradouroVar = iptNumLogradouro.value;
    var cepVar = iptCEP.value;
    var telefoneVar = iptTelefone.value;
    var nomeCompletoVar = iptNomeCompleto.value;
    var cpfVar = iptCPF.value;
    var celularVar = iptCelular.value;
    var nascimentoVar = iptNascimento.value;
    var emailVar = iptEmail.value;
    var senhaVar = iptSenha.value;
    // var Var = ipt.value;
    // var Var = ipt.value;
  

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
            nomeFantasiaServer: nomeFantasiaVar,
            logradouroServer: logradouroVar,
            numLogradouroServer: numLogradouroVar,
            cepServer: cepVar,
            telefoneServer: telefoneVar,
            nomeCompletoServer: nomeCompletoVar,
            cpfServer: cpfVar,
            celularServer: celularVar,
            nascimentoServer: nascimentoVar,
            emailServer: emailVar,
            senhaServer: senhaVar

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

function addAgencia() {
    let form = document.getElementById("form-agencia");
    if (localStorage.AGENCIAS_ADD < 5) {
        localStorage.AGENCIAS_ADD = Number(localStorage.AGENCIAS_ADD) + 1
        
        let divRow = document.createElement("div");
        divRow.className = "row mb-3";
        let divCol = document.createElement("div");
        divCol.className = "col-md-8 col-lg-9";
        let label = document.createElement("label");
        label.className = "col-md-4 col-lg-3 col-form-label";
        label.style.width = "100%";
        label.innerHTML = `Agência ${localStorage.AGENCIAS_ADD}`;
        let input = document.createElement("input");
        input.className = "form-control";
        
        divCol.appendChild(label);
        divCol.appendChild(input);
        divRow.appendChild(divCol);
        form.appendChild(divRow);

        if (localStorage.AGENCIAS_ADD == 5) {
            let aviso = document.createElement("label");
            aviso.className = "col-md-4 col-lg-3 col-form-label";
            aviso.style.width = "100%";
            aviso.innerHTML = `Número máximo de agências atingido!`;
            form.appendChild(aviso);

            document.getElementById("botao-add-agencia").style.display = "none";

        }
    } 
}