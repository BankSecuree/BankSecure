var usuariosModel = require("../models/usuariosModel");

function exibirTabelaUsuarios(req, res) {
  var idUsuario = req.params.idUsuario;

  usuariosModel.exibirTabelaUsuarios(idUsuario).then(function (resultado) {
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

function cadastrarEmpresaGerente(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  // var nome = req.body.nomeServer;
  // var email = req.body.emailServer;
  // var senha = req.body.senhaServer;

  var cnpj = req.body.cnpjServer;
  var razaoSocial = req.body.razaoSocialServer;
  var nomeFantasia = req.body.nomeFantasiaServer;
  var logradouro = req.body.logradouroServer;
  var numLogradouro = req.body.numLogradouroServer;
  var cep = req.body.cepServer;
  var telefone = req.body.telefoneServer;
  var nomeCompleto = req.body.nomeCompletoServer;
  var cpf = req.body.cpfServer;
  var celular = req.body.celularServer;
  var nascimento = req.body.nascimentoServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  // Faça as validações dos valores
  // if (nomeEmpresa == undefined) {
  //   res.status(400).send("Seu nome está undefined!");
  // } else if (email == undefined) {
  //   res.status(400).send("Seu email está undefined!");
  // } else if (telefone == undefined) {
  //   res.status(400).send("Sua senha está undefined!");
  // } else {

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuariosModel.cadastrarEmpresaGerente(cnpj, razaoSocial, nomeFantasia, logradouro, numLogradouro, cep, telefone, nomeCompleto, cpf, celular, nascimento, email, senha)
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

function cadastrarAgencia(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  // var nome = req.body.nomeServer;
  // var email = req.body.emailServer;
  // var senha = req.body.senhaServer;

  var apelido = req.body.agenciaApelidoServer;
  var cnpj = req.body.agenciaCnpjServer;
  var cep = req.body.agenciaCepServer;
  var logradouro = req.body.agenciaLogradouroServer;
  var numLogradouro = req.body.agenciaNumeroServer;
  var telefone = req.body.agenciaTelefoneServer;
  

  // Faça as validações dos valores
  // if (nomeEmpresa == undefined) {
  //   res.status(400).send("Seu nome está undefined!");
  // } else if (email == undefined) {
  //   res.status(400).send("Seu email está undefined!");
  // } else if (telefone == undefined) {
  //   res.status(400).send("Sua senha está undefined!");
  // } else {

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuariosModel.cadastrarAgencia(apelido, cnpj, cep, logradouro, numLogradouro, telefone)
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
  exibirTabelaUsuarios,
  cadastrarEmpresaGerente, 
  cadastrarAgencia
}