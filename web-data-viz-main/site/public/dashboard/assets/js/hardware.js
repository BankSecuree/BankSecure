globalDadosPreAlteracoes = [];
let contador = 0;

function validar() {

    var nomeMaquinaVar = ipt_nomeMaquina.value;
    var cpuVar = ipt_cpu.value;
    var memoriaVar = ipt_memoria.value;
    var discoVar = ipt_disco.value;
    var temperaturaVar = ipt_temperaturaLimite.value;


    if (nomeMaquinaVar == "") {
        msg_alertas.style.display = "block"
        Erro = document.getElementById("mensagemErro")
        Erro.classList.add("alerta")
        mensagemErro.innerHTML = `O campo da CPU não pode estar vazia`
        temErro = true;
    }
    else if (cpuVar == "") {
        msg_alertas.style.display = "block"
        Erro = document.getElementById("mensagemErro")
        Erro.classList.add("alerta")
        mensagemErro.innerHTML = `O campo da CPU não pode estar vazia`
        temErro = true;
    }
    else if (memoriaVar == "") {
        msg_alertas.style.display = "block"
        Erro = document.getElementById("mensagemErro")
        Erro.classList.add("alerta")
        mensagemErro.innerHTML = `O campo de memória não pode estar vazia`
        temErro = true;
    }
    else if (discoVar == "") {
        msg_alertas.style.display = "block"
        Erro = document.getElementById("mensagemErro")
        Erro.classList.add("alerta")
        mensagemErro.innerHTML = `O campo disco não pode estar vaziO`
        temErro = true;
    }
    else if (temperaturaVar == "") {
        msg_alertas.style.display = "block"
        Erro = document.getElementById("mensagemErro")
        Erro.classList.add("alerta")
        mensagemErro.innerHTML = `O campo de temperatura não pode estar vazio`
        temErro = true;
    }
}


function desaparecerCard() {
    msg_alertas.style.display = "none"
}

function cadastrarNomeMaquina() {
    var nomeMaquinaVar = ipt_nomeMaquina.value;
    var fkAgenciaVar = ipt_fkAgencia.value;
    var tipoMaquinaVar = ipt_fkMaquina.value;
    
    fetch(`/hardware/cadastrarNomeMaquina`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeMaquinaServer: nomeMaquinaVar,
            fkAgenciaServer: fkAgenciaVar,
            tipoMaquinaServer: tipoMaquinaVar
        })
    }).then(function (resposta) {
        console.log("resposta: ", resposta);
        if (resposta.ok) {
            cadastrarComponente()
            criarViewMaquina(nomeMaquinaVar)
            cardMsg.style.display = "block"
            cardMsg.style.border = "2px solid greenyellow"
            cardMsg.style.color = "greenyellow"
            cardMsg.innerHTML = "✅Máquina cadastrada! Atualizando...✅";
            setTimeout(function () {
                //location.reload();
            }, 2000);
        } else {
            cardMsg.style.display = "block"
            cardMsg.style.border = "2px solid red"
            cardMsg.style.color = "red"
            cardMsg.innerHTML = "❌Erro ao cadastrar máquina! Tente novamente...❌";
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`)
    });
    return false
}

function criarViewMaquina(nomeMaquina) {

    fetch(`/hardware/criarViewMaquina`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeMaquinaServer: nomeMaquina
        })
    }).then(function (resposta) {
        console.log("resposta: ", resposta);
        if (resposta.ok) {
        } else {
            throw ("Houve um erro ao criar a view da máquina!")
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`)
    });
}

function cadastrarComponente() {

    var valorCheckBox = document.querySelectorAll('input[type="checkbox"]:checked');
    var vt_listaComponentes = [];

    valorCheckBox.forEach((checkbox) => {
        vt_listaComponentes.push(checkbox.value);
    });

    for (let i = 0; i < vt_listaComponentes.length; i++) {

        var componenteVar = vt_listaComponentes[i]
        fetch(`/hardware/cadastrarComponente`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                componenteServer: componenteVar
            })
        }).then(function (resposta) {
            console.log("resposta: ", resposta);
            if (resposta.ok) {
            } else {
                throw ("Houve um erro ao realizar o cadastro os componentes!")
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`)
        });

    }

}

function cadastrarTipoMaquina() {

    fetch(`/hardware/cadastrarTipoMaquina`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tipoMaquinaServer: tipoMaquinaVar
        })
    }).then(function (resposta) {
        console.log("resposta: ", resposta);
        if (resposta.ok) {
        } else {
            throw ("Houve um erro ao realizar o cadastro do tipo de máquina!")
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`)
    });
}


function exibirOptionAgencia() {
    fetch(`/hardware/exibirOptionAgencia/${sessionStorage.ID_EMPRESA}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var lista = document.getElementById("ipt_fkAgencia");
                var mensagem = document.createElement("option");
                mensagem.innerHTML = "Nenhuma agência cadastrada."
                lista.appendChild(mensagem);
            }
            resposta.json().then(function (resposta) {
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];
                    var lista = document.getElementById("ipt_fkAgencia");

                    var option = document.createElement("option");
                    option.innerHTML = publicacao.apelido;
                    option.setAttribute("value", `${publicacao.idAgencia}`);

                    lista.appendChild(option);
                }
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function exibirTabelaMaquinas() {
    var lista = document.getElementById("tabela-maquinas");
    var trColunas = document.createElement("tr");
    var thead = document.createElement("thead");
    var thId = document.createElement("th");
    thId.setAttribute("scope", "row");
    thId.innerHTML = "#";
    var thApelido = document.createElement("th");
    thApelido.setAttribute("scope", "row");
    thApelido.innerHTML = "Apelido";
    var thTipo = document.createElement("th");
    thTipo.setAttribute("scope", "row");
    thTipo.innerHTML = "Tipo";
    var thAgencia = document.createElement("th");
    thAgencia.setAttribute("scope", "row");
    thAgencia.innerHTML = "Agência";
    trColunas.appendChild(thId);
    trColunas.appendChild(thApelido);
    trColunas.appendChild(thTipo);
    trColunas.appendChild(thAgencia);
    if (sessionStorage.GERENTE_USUARIO == "1") {
        var thExcluir = document.createElement("th");
        thExcluir.setAttribute("scope", "row");
        thExcluir.innerHTML = "Editar/Excluir";
        trColunas.appendChild(thExcluir);
    }
    thead.appendChild(trColunas);
    lista.appendChild(thead);
    fetch(`/hardware/exibirTabelaMaquinas/${sessionStorage.ID_EMPRESA}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var lista = document.getElementById("tabela-maquinas");
                var mensagem = document.createElement("p");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                lista.innerHTML = "";
                lista.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }
            resposta.json().then(function (resposta) {
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];
                    var lista = document.getElementById("tabela-maquinas");

                    var thNumero = document.createElement("th");
                    thNumero.innerHTML = publicacao.idMaquina;
                    thNumero.setAttribute("scope", "row");
                    thNumero.setAttribute("id", `campoId${publicacao.idMaquina}`)
                    var tdApelido = document.createElement("td");
                    tdApelido.innerHTML = publicacao.nome;
                    tdApelido.setAttribute("id", `campoNome${publicacao.idMaquina}`)
                    var tdTipo = document.createElement("td");
                    tdTipo.innerHTML = publicacao.tipo;
                    tdTipo.setAttribute("id", `campoTipo${publicacao.idMaquina}`)
                    var tdAgencia = document.createElement("td");
                    tdAgencia.innerHTML = publicacao.agencia;
                    tdAgencia.setAttribute("id", `campoAgencia${publicacao.idMaquina}`)
                    var tdButton = document.createElement("td");
                    tdButton.setAttribute("id", `campoBotoes${publicacao.idMaquina}`)
                    tdButton.innerHTML = `<a onclick="editarMaquina(${publicacao.idMaquina})" class="btn btn-primary btn-sm" title="Remove my profile image"><i
                    class="bi bi-pencil-square"></i></a>
                    <a onclick="excluirMaquina(${publicacao.idMaquina})" class="btn btn-danger btn-sm" title="Remove my profile image"><i
                    class="bi bi-trash"></i></a>
                    `;
                    var tr = document.createElement("tr");
                    var tbody = document.createElement("tbody");


                    tr.appendChild(thNumero);
                    tr.appendChild(tdApelido);
                    tr.appendChild(tdTipo);
                    tr.appendChild(tdAgencia);
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

function excluirMaquina(idMaquina){
    fetch(`/hardware/deletarMaquina/${idMaquina}`).then((resposta) => {
        if(resposta.ok){
            alert("Excluido com sucesso")
            window.location.reload()
        } else{
            alert("Algo deu errado!")
        }
    })
}

function editarMaquina(idMaquina){
    let nome = document.getElementById(`campoNome${idMaquina}`)
    let tipo = document.getElementById(`campoTipo${idMaquina}`      )
    let agencia = document.getElementById(`campoAgencia${idMaquina}`)
    let botoes = document.getElementById(`campoBotoes${idMaquina}`)
    let valorNome = nome.innerText;
    let valorTipo = tipo.innerText;
    let valorAgencia = agencia.innerText;

    nome.innerHTML = `<input type='text' id='novoNome${idMaquina}' value='${valorNome}'> `
    tipo.innerHTML = `<input type='text' id='novoTipo${idMaquina}' value='${valorTipo}'> `
    agencia.innerHTML = `<input type='text' id='novoAgencia${idMaquina}' value='${valorAgencia}'> `
    botoes.innerHTML = `<button onclick='alterarMaquina(${idMaquina})' class="btn btn-danger btn-sm" >Alterar</button>
    <button onclick='voltar(${idMaquina}, ${contador})' class="btn btn-primary btn-sm">Voltar</button>'`

    globalDadosPreAlteracoes.push({
        nome: valorNome,
        tipo: valorTipo,
        agencia: valorAgencia
    });
    contador++
}

function alterarMaquina(idMaquina){
    let valorNome = document.getElementById(`novoNome${idMaquina}`).value;
    let valorTipo = document.getElementById(`novoTipo${idMaquina}`).value;
    let valorAgencia = document.getElementById(`novoAgencia${idMaquina}`).value;

    fetch(`/hardware/alterarMaquina`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idMaquinaServer: idMaquina,
            nomeMaquinaServer: valorNome,
            tipoServer: valorTipo,
            agenciaServer: valorAgencia
        })
    }).then( (resposta) => {
        if(resposta.ok){
            alert("Alterado com sucesso");
            let nome = document.getElementById(`campoNome${idMaquina}`)
            let tipo = document.getElementById(`campoTipo${idMaquina}`      )
            let agencia = document.getElementById(`campoAgencia${idMaquina}`)
            nome.innerHTML = valorNome;
            tipo.innerHTML = valorTipo;
            agencia.innerHTML = valorAgencia;
            document.getElementById(`campoBotoes${idMaquina}`).innerHTML = `<a onclick="editarMaquina(${idMaquina})" class="btn btn-primary btn-sm" title="Remove my profile image"><i
            class="bi bi-pencil-square"></i></a>
            <a onclick="excluirMaquina(${idMaquina})" class="btn btn-danger btn-sm" title="Remove my profile image"><i
            class="bi bi-trash"></i></a>
             `;
        }
    }).catch((err) => {
        alert(err);
    })

}
function voltar(idMaquina, posicao){
    let nome = document.getElementById(`campoNome${idMaquina}`)
    let tipo = document.getElementById(`campoTipo${idMaquina}`      )
    let agencia = document.getElementById(`campoAgencia${idMaquina}`)
    nome.innerHTML = globalDadosPreAlteracoes[posicao].nome;
    tipo.innerHTML = globalDadosPreAlteracoes[posicao].tipo;
    agencia.innerHTML = globalDadosPreAlteracoes[posicao].agencia;
    document.getElementById(`campoBotoes${idMaquina}`).innerHTML = `<a onclick="editarMaquina(${idMaquina})" class="btn btn-primary btn-sm" title="Remove my profile image"><i
    class="bi bi-pencil-square"></i></a>
    <a onclick="excluirMaquina(${idMaquina})" class="btn btn-danger btn-sm" title="Remove my profile image"><i
    class="bi bi-trash"></i></a>
    `;
}