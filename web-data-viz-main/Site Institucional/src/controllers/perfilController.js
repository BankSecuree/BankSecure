var perfilModel = require("../models/perfilModel");

function exibirPerfil(req, res) {
  var idUsuario = req.params.idUsuario;

  perfilModel.exibirPerfil(idUsuario).then(function (resultado) {
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

function alterarImagem(req, res) {
  var foto = req.file.filename;
  var idUsuario = req.params.idUsuario;

  perfilModel.alterarImagem(foto, idUsuario)
  .then(resultado => {
      // res.status(201).send("foto alterada com sucesso");
      res.json(resultado);
    }).catch(err => {
      res.status(500).send(err);
    });
}

function atualizarFoto(req, res) {
  var idUsuario = req.params.idUsuario;

  perfilModel.atualizarFoto(idUsuario).then(function (resultado) {
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
  exibirPerfil,
  alterarImagem,
  atualizarFoto
}