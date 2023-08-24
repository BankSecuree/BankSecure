function cadastrarHardware() {
    var cpuVar = ipt_cpu.value;
    var memoriaVar = ipt_memoria.value;
    var discoVar = ipt_disco.value;
    var temperaturaVar = ipt_temperaturaLimite.value;
            

    fetch("/hardware/cadastrarHardware", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cpuServer: cpuVar,
            memoriaServer: memoriaVar,
            discoServer: discoVar,
            temperaturaServer: temperaturaVar
        })
    }).then(function (resposta) {
        
        console.log("resposta: ", resposta);
        
        if (resposta.ok) {

            alert("Cadastro da máquina realizado com sucesso!");

        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {

        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}