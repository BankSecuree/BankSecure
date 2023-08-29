var hardwareModel = require("../models/hardwareModel")

function cadastrarNomeMaquina(req, res){
    var nomeMaquina = req.body.nomeMaquinaServer;
    var fkAgencia = req.body.fkAgenciaServer;

    if (nomeMaquina == undefined) {
        res.status(400).send("O nome da sua máquina está undefined")
    } else if(fkAgencia == undefined){
        res.status(400).send("A sua fkAgencia está undefined")
    }else{

        hardwareModel.cadastrarNomeMaquina(nomeMaquina, fkAgencia)
            .then(
                function(resultado){
                    res.json(resultado);
                }
            ).catch(
                function(erro){
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o cadastro!Erro: ",
                    erro.sqlMessage
                    );
                    res.status(500).send(erro.sqlMessage);
                }
            )
    }
}



function cadastrarHardwareCpu(req, res) {
    
    var cpu = req.body.cpuServer;
    
    if (cpu == undefined) {
        res.status(400).send("Sua cpu está undefined!");
    } else {
        hardwareModel.cadastrarHardwareCpu(cpu)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }
}

function cadastrarHardwareMemoria(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var memoria = req.body.memoriaServer;
   
    
    // Faça as validações dos valores
    if (memoria == undefined) {
        res.status(400).send("Sua memória está undefined!");
    }else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        hardwareModel.cadastrarHardwareMemoria(memoria)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarHardwareDisco(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var disco = req.body.discoServer;
   
    
    // Faça as validações dos valores
    if (disco == undefined) {
        res.status(400).send("Sua memória está undefined!");
    }else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        hardwareModel.cadastrarHardwareDisco(disco)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function cadastrarHardwareTemperatura(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var temperatura = req.body.temperaturaServer;
   
    
    // Faça as validações dos valores
    if (temperatura == undefined) {
        res.status(400).send("Sua memória está undefined!");
    }else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        hardwareModel.cadastrarHardwareTemperatura(temperatura)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarHardware(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeMaquina = req.body.nomeMaquinaServer;
    var fkAgencia = req.body.fkAgenciaServer;
    var nome_cpu = req.body.nome_cpuServer;
    var nome_memoria = req.body.nome_memoriaServer;
    var nome_disco = req.body.nome_discoServer;
    var nome_temperatura = req.body.nome_temperaturaServer;

    console.log("aaaaaa")
    console.log("aaaaaa")
   
    if (nomeMaquina == undefined) {
        res.status(400).send("O nome da sua máquina está undefined");
    } else if (fkAgencia == undefined) {
        res.status(400).send("Sua fkAgencia está undefined")       
    } else if (nome_cpu == undefined) {
        res.status(400).send("Sua cpu está undefined");
    } else if (nome_memoria == undefined) {
        res.status(400).send("Sua memoria está undeifned");
    } else if (nome_disco == undefined){
        res.status(400).send("Sua disco está undefined");
    } else if (nome_temperatura == undefined){
        res.status(400).send("Sua temperatura está undefined")
    } else {
        hardwareModel.cadastrarHardware()
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
        }
}

module.exports = {
    cadastrarHardware
}