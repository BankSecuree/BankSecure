var dashAnalistaModel = require("../models/dashAnalistaModel");

function dadosAnalista(req, res) {
    var componente = req.body.componenteServer;
    var agencia = req.body.agenciaServer;

    console.log("To na controller")
    
    if (componente == undefined) {
      res.status(400).send("Seu componente está undefined!");
    } else if (agencia == undefined) {
      res.status(400).send("Seu agencia está undefined!");
    } else {
      dashAnalistaModel.dadosAnalista(agencia,componente)
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
    dadosAnalista
  }