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
        hardwareModel.cadastrarHardwareMemoria(disco)
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
        hardwareModel.cadastrarHardwareMemoria(temperatura)
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
    cadastrarNomeMaquina,
    cadastrarHardwareCpu,
    cadastrarHardwareMemoria,
    cadastrarHardwareDisco,
    cadastrarHardwareTemperatura
}