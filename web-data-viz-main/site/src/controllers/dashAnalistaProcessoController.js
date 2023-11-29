var dashAnalistaProcessoModel = require("../models/dashAnalistaProcessoModel");
// var dashAnalistaModel = require("../models/dashAnalistaModel");

function dadosAnalista(req, res) {
    var processo = req.body.processoServer;
    var agencia = req.body.agenciaServer;
  
    console.log("To na controller")
    
    if (processo == undefined) {
      res.status(400).send("Seu processo está undefined!");
    } else if (agencia == undefined) {
      res.status(400).send("Sua agencia está undefined!");
    } else {
      dashAnalistaProcessoModel.dadosAnalista(agencia,processo)
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

  function dadosCards(req, res) {
    var maquina = req.body.maquinaServer;
  
    console.log("To na controller")
    
    if (maquina == undefined) {
      res.status(400).send("Sua maquina está undefined!");
    } else {
      dashAnalistaProcessoModel.dadosCards(maquina)
        .then(
          function (resultado) {
            res.json(resultado);
          }
        ).catch(
          function (erro) {
            console.log(erro);
            console.log(
              "\nHouve um erro ao realizar dadosCards! Erro: ",
              erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
          }
        );
    }
  }

  module.exports = {
    dadosAnalista,
    dadosCards
  }