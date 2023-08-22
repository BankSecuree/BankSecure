var hardwareModel = require("../models/hardwareModel")

function cadastrarHardware(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var cpu = req.body.cpuServer;
    var memoria = req.body.memoriarServer;
    var disco = req.body.discoServer;
    var temperatura = req.body.temperaturaServer;
    var fkEmpresa = req.body.fkEmpresaServer;

    // Faça as validações dos valores
    if (cpu == undefined) {
        res.status(400).send("Sua cpu está undefined!");
    } else if (memoria == undefined) {
        res.status(400).send("Sua memória está undefined!");
    } else if (disco == undefined) {
        res.status(400).send("Seu disco está undefined!");
    }else if (temperatura == undefined) {
        res.status(400).send("Seu limite de temperatura está undefined!");
    }else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        hardwareModel.cadastrarHardware(cpu, memoria, disco, temperatura, fkEmpresa)
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