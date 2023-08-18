var usuariosModel = require("../models/usuariosModel");

function exibirTabelaUsuarios(req, res) {
  var gerente = req.params.gerente;

  usuariosModel.exibirTabelaUsuarios(gerente).then(function (resultado) {
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

  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

<<<<<<< HEAD
=======


<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> a385b61d2c3de89b9ea7141c464c317de9eceae2
=======
>>>>>>> a385b61d2c3de89b9ea7141c464c317de9eceae2
=======
>>>>>>> a385b61d2c3de89b9ea7141c464c317de9eceae2
  usuariosModel.cadastrarEmpresaGerente(nome, email, senha)
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


module.exports = {
  exibirTabelaUsuarios,
  cadastrarEmpresaGerente
}