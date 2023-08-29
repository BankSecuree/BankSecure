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


module.exports = {
    cadastrarNomeMaquina
}