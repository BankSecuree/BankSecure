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
    fetch(`/hardware/cadastrarNomeMaquina`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeMaquinaServer: nomeMaquinaVar,
            fkAgenciaServer: fkAgenciaVar,
        })
    }).then(function (resposta) {
        console.log("resposta: ", resposta);
        if (resposta.ok) {
            alert("Máquina cadastrada com sucesso")
            cadastrarComponente();
            cadastrarTipoMaquina();
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

    var valorOptTipoMaquina = document.getElementById("opt_tipoMaquina");
    var tipoMaquinaVar = valorOptTipoMaquina.options[valorOptTipoMaquina.selectedIndex].value;
    console.log("Sua máquina é um" + tipoMaquinaVar)
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
