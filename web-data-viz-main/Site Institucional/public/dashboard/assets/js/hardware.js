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

function cadastrarNomeMaquina(){
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
        }).then(function(resposta){
            console.log("resposta: ", resposta);
            if (resposta.ok) {
                alert("Máquina cadastrada com sucesso")
                cadastrarComponente(nomeMaquinaVar);
            } else{
                throw("Houve um erro ao realizar o cadastro da máquina!")
            }
        }). catch(function(resposta){
            console.log(`#ERRO: ${resposta}`)
        });
        return false
}

function cadastrarComponente(nomeMaquinaVar) {
    var cpuVar = ipt_cpu.value;
    var memoriaVar = ipt_memoria.value;
    var discoVar = ipt_disco.value;

    for (let i = 0; i < array.length; i++) {

        var componenteVar = vetor[i];
        
        fetch(`/hardware/cadastrarComponente`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                componenteServer: componenteVar,
                nomeMaquinaServer: nomeMaquinaVar
            })
        }).then(function(resposta){
            console.log("resposta: ", resposta);
            if (resposta.ok) {
                alert("Componente cadastrado com sucesso!")
            } else{
                throw("Houve um erro ao realizar o cadastro os componentes!")
            }
        }). catch(function(resposta){
            console.log(`#ERRO: ${resposta}`)
        });
        return false

    }
}