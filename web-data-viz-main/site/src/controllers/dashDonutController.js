var dashDonutModel = require("../models/dashDonutModel");

function exibirDonut(req, res) {
  var fkEmpresa = req.params.fkEmpresa;
  var fkComponente = req.params.fkComponente;

  dashDonutModel.exibirDonut(fkEmpresa,fkComponente).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar exibirDonutServidor: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

module.exports = {
  exibirDonut
}