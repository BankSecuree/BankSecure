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
            alert("Máquina cadastrada com sucesso")
            cadastrarComponente();
        } else {
            throw ("Houve um erro ao realizar o cadastro da máquina!")
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`)
    });
    return false
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
                alert("Componentes cadastrado com sucesso!")
            } else {
                throw ("Houve um erro ao realizar o cadastro os componentes!")
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`)
        });

    }


}

function cadastrarTipoMaquina() {

    
    alert(tipoMaquinaVar);

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
            alert("Tipo de Máquina cadastrado com sucesso!")
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
    var thCpu = document.createElement("th");
    thCpu.setAttribute("scope", "row");
    thCpu.innerHTML = "CPU";
    var thMemoria = document.createElement("th");
    thMemoria.setAttribute("scope", "row");
    thMemoria.innerHTML = "Memória";
    var thDisco = document.createElement("th");
    thDisco.setAttribute("scope", "row");
    thDisco.innerHTML = "Disco";
    trColunas.appendChild(thId);
    trColunas.appendChild(thApelido);
    trColunas.appendChild(thCpu);
    trColunas.appendChild(thMemoria);
    trColunas.appendChild(thDisco);
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
                    var tdApelido = document.createElement("td");
                    tdApelido.innerHTML = publicacao.apelido;
                    var tdCpu = document.createElement("td");
                    tdCpu.innerHTML = publicacao.cpuMaquina;
                    var tdmemoria= document.createElement("td");
                    tdmemoria.innerHTML = publicacao.cpuMaquina;
                    var tdDisco = document.createElement("td");
                    tdDisco.innerHTML = publicacao.cpuMaquina;
                    var tdButton = document.createElement("td");
                    tdButton.innerHTML = `<a onclick="editarAgencia(${publicacao.idMaquina})" class="btn btn-primary btn-sm" title="Remove my profile image"><i
                    class="bi bi-pencil-square"></i></a>
                    <a onclick="excluirAgencia(${publicacao.idMaquina})" class="btn btn-danger btn-sm" title="Remove my profile image"><i
                    class="bi bi-trash"></i></a>
                    `;
                    var tr = document.createElement("tr");
                    var tbody = document.createElement("tbody");


                    tr.appendChild(thNumero);
                    tr.appendChild(tdApelido);
                    tr.appendChild(tdCpu);
                    tr.appendChild(tdMemoria);
                    tr.appendChild(tdDisco);
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
