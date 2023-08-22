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
    var cep = iptCep;
    var logradouro = iptLogradouro.value
    var nomero = iptNumero.value

    if (ipt_apelido == "") {
        msg_alertas.style.display = "block"
        Erro = document.getElementById("mensagemErro")
        Erro.classList.add("alerta")
        mensagemErro.innerHTML = `O Apelido não pode ser vazio`
    }


}

function cadastrarAgencia() {
    validar();
}  
