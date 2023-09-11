var hardwareModel = require("../models/hardwareModel")

function cadastrarNomeMaquina(req, res){
    var nomeMaquina = req.body.nomeMaquinaServer;
    var fkAgencia = req.body.fkAgenciaServer;
    var tipoMaquina = req.body.tipoMaquinaServer;

    if (nomeMaquina == undefined) {
        res.status(400).send("O nome da sua máquina está undefined")
    } else if(fkAgencia == undefined){
        res.status(400).send("A sua fkAgencia está undefined")
    } else if (tipoMaquina == undefined) {
        res.status(400).send("O seu tipo de máquina está undefined")
    }
    else{
        hardwareModel.cadastrarNomeMaquina(nomeMaquina, fkAgencia, tipoMaquina)
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

function cadastrarComponente(req, res){
    
    var componente = req.body.componenteServer

    if (componente == undefined) {
        res.status(400).send("A sua cpu está undefined")
    }else {
        hardwareModel.cadastrarComponente(componente)
            .then(
                function(resultado){
                    res.json(resultado);
                }
            ).catch(
                    function(erro){
                    console.log(erro);
                    console.log("\nHouver um erro ao realizar o cadastro!Erro: ",
                    erro.sqlMessage
                    );
                    res.status(500).send(erro.sqlMessage);
                }
            )
    }
}

function exibirOptionAgencia(req, res){
    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa == undefined) {
        res.status(400).send("A sua idEmpresa está undefined")
    }else {
        hardwareModel.exibirOptionAgencia(idEmpresa)
            .then(
                function(resultado){
                    res.json(resultado);
                }
            ).catch(
                    function(erro){
                    console.log(erro);
                    console.log("\nHouver um erro ao exibirOptionAgencia !Erro: ",
                    erro.sqlMessage
                    );
                    res.status(500).send(erro.sqlMessage);
                }
            )
    }
}

function exibirTabelaMaquinas(req, res) {
    var idEmpresa = req.params.idEmpresa;
  
    hardwareModel.exibirTabelaMaquinas(idEmpresa).then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!")
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
  }


module.exports = {
    cadastrarNomeMaquina,
    cadastrarComponente,
    exibirTabelaMaquinas,
    exibirOptionAgencia
}