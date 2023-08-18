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

function cadastrarEmpresaGerente(){

}