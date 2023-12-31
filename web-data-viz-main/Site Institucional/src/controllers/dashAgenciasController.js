var dahAgenciasModel = require("../models/dashAgenciasModel");

function exibirListaAgencias(req, res) {
  var idUsuario = req.params.idUsuario;

  dahAgenciasModel.exibirListaAgencias(idUsuario).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar exibirListaAgencias: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function exibirView(req, res) {
  var idMaquina = req.params.idMaquina;

  dahAgenciasModel.exibirView(idMaquina).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar graficoAgencia: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function graficoAgencia(req, res) {
  var idAgencia = req.params.idAgencia;

  dahAgenciasModel.exibirView(idAgencia).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar exibirListaAgencias: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

module.exports = {
  exibirListaAgencias ,
  exibirView,
  graficoAgencia
}