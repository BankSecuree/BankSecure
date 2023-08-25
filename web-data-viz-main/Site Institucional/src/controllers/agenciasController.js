var agenciasModel = require("../models/agenciasModel");

function exibirTabelaAgencias(req, res) {
  var idEmpresa = req.params.idEmpresa;

  agenciasModel.exibirTabelaAgencias(idEmpresa).then(function (resultado) {
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

function exibirQuantidadeFuncionariosAgencia(req, res) {
  var idAgencia = req.params.idAgencia;

  agenciasModel.exibirQuantidadeFuncionariosAgencia(idAgencia).then(function (resultado) {
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

function cadastrarAgencia(req, res) {
  var apelido = req.body.agenciaApelidoServer;
  var cnpj = req.body.agenciaCnpjServer;
  var cep = req.body.agenciaCepServer;
  var logradouro = req.body.agenciaLogradouroServer;
  var numLogradouro = req.body.agenciaNumeroServer;
  var telefone = req.body.agenciaTelefoneServer;
  
  // if (nomeEmpresa == undefined) {
  //   res.status(400).send("Seu nome está undefined!");
  // } else if (email == undefined) {
  //   res.status(400).send("Seu email está undefined!");
  // } else if (telefone == undefined) {
  //   res.status(400).send("Sua senha está undefined!");
  // } else {
    agenciasModel.cadastrarAgencia(apelido, cnpj, cep, logradouro, numLogradouro, telefone)
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
// }


module.exports = {
  exibirTabelaAgencias,
  exibirQuantidadeFuncionariosAgencia,
  cadastrarAgencia
}