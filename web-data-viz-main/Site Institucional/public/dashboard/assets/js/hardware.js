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

function cadastrarMaquina(){
    var nomeMaquinaVar = ipt_nomeMaquina.value;
    var fkAgenciaVar = ipt_fkAgencia.value;
    var cpuVar = ipt_cpu.value;
    var memoriaVar = ipt_memoria.value;
    var discoVar = ipt_disco.value;
    var temperaturaVar = ipt_temperaturaLimite.value;

    // validar();
    // desaparecerCard();

    // if (temErro == false) {
        
        fetch("/hardware/cadastrarNomeMaquina", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeMaquinaServer: nomeMaquinaVar,
                fkAgenciaServer: fkAgenciaVar
            })
        }).then(function(resposta){

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                alert("Nome da máquina cadastrada com sucesso")


                fetch("/hardware/cadastrarHardwareCpu", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        cpuServer: cpuVar
                    })
                }).then(function(resposta){
        
                    console.log("resposta: ", resposta);
        
                    if (resposta.ok) {
                        fetch("/hardware/cadastrarHardwareMemoria", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                memoriaServer: memoriaVar
                            })
                        }).then(function(resposta){
                
                            console.log("resposta: ", resposta);
                
                            if (resposta.ok) {
                                fetch("/hardware/cadastrarHardwareDisco", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        discoServer: discoVar
                                    })
                                }).then(function(resposta){
                        
                                    console.log("resposta: ", resposta);
                        
                                    if (resposta.ok) {
                                        fetch("/hardware/cadastrarHardwareTemperatura", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify({
                                                temperaturaServer: temperaturaVar
                                            })
                                        }).then(function(resposta){
                                
                                            console.log("resposta: ", resposta);
                                
                                            if (resposta.ok) {
                                                alert("Hardware da máquina cadastrado com sucesso")
                                                
                                
                                            } else{
                                
                                                throw("Houve um erro ao realizar o cadastro do hardware!")
                                
                                            }
                                        }). catch(function(resposta){
                                
                                            console.log(`#ERRO: ${resposta}`)
                                
                                        });
                                
                                        return false
                                        
                        
                                    } else{
                        
                                        throw("Houve um erro ao realizar o cadastro do hardware!")
                        
                                    }
                                }). catch(function(resposta){
                        
                                    console.log(`#ERRO: ${resposta}`)
                        
                                });
                        
                                return false
                                
                
                            } else{
                
                                throw("Houve um erro ao realizar o cadastro do hardware!")
                
                            }
                        }). catch(function(resposta){
                
                            console.log(`#ERRO: ${resposta}`)
                
                        });
                
                        return false
                        
        
                    } else{
        
                        throw("Houve um erro ao realizar o cadastro do hardware!")
        
                    }
                }). catch(function(resposta){
        
                    console.log(`#ERRO: ${resposta}`)
        
                });
        
                return false

            } else{

                throw("Houve um erro ao realizar o cadastro da máquina!")

            }
        }). catch(function(resposta){

            console.log(`#ERRO: ${resposta}`)

        });

        return false

    // }
    // else{
    //     msg_alertas.style.display = "block"
    //     Erro = document.getElementById("mensagemErro")
    //     Erro.classList.add("error")
    //     mensagemErro.innerHTML += `Corrija os campos`
    //     temErro = true;
    // }
}
