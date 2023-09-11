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
  var logradouro = req.body.logradouroServer;
  var numLogradouro = req.body.numLogradouroServer;
  var cep = req.body.cepServer;
  var telefone = req.body.telefoneServer;
  var nomeCompleto = req.body.nomeCompletoServer;
  var cpf = req.body.cpfServer;
  var celular = req.body.celularServer;
  var nascimento = req.body.nascimentoServer;
  var fkGerente = req.body.fkGerenteServer;
  var cargo = req.body.cargoServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var dataInicio = req.body.dataInicioServer;


  // Faça as validações dos valores
  // if (nomeEmpresa == undefined) {
  //   res.status(400).send("Seu nome está undefined!");
  // } else if (email == undefined) {
  //   res.status(400).send("Seu email está undefined!");
  // } else if (telefone == undefined) {
  //   res.status(400).send("Sua senha está undefined!");
  // } else {

  // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
  usuariosModel.cadastrarEmpresaGerente(cnpj, razaoSocial, logradouro, numLogradouro, cep, telefone, nomeCompleto, cpf, celular, nascimento, email, senha, cargo, fkGerente, dataInicio)
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



function cadastrarFuncionario(req, res) {
  var nomeCompleto = req.body.nomeCompletoServer;
  var cpf = req.body.cpfServer;
  var celular = req.body.celularServer;
  var nascimento = req.body.nascimentoServer;
  var fkGerente = req.body.fkGerenteServer;
  var cargo = req.body.cargoServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var dataInicio = req.body.dataInicioServer;
  var cnpjEmpresa = req.body.cnpjServer;

  if (nomeCompleto == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (celular == undefined) {
    res.status(400).send("Seu celular está undefined!");
  } else if (cpf == undefined) {
    res.status(400).send("Seu cpf está undefined!");
  } else if (celular == undefined) {
    res.status(400).send("Seu celular está undefined!");
  } else if (nascimento == undefined) {
    res.status(400).send("Seu nascimento está undefined!");
  } else if (fkGerente == undefined) {
    res.status(400).send("Seu fkGerente está undefined!");
  } else if (cargo == undefined) {
    res.status(400).send("Seu cargo está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (dataInicio == undefined) {
    res.status(400).send("Seu dataInicio está undefined!");
  } else if (cnpjEmpresa == undefined) {
    res.status(400).send("Seu cnpjEmpresa está undefined!");
  } else {
    usuariosModel.cadastrarFuncionario(nomeCompleto, cpf, celular, nascimento, email, senha, cargo, fkGerente, dataInicio, cnpjEmpresa)
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

function listarUltimoIdEmpresa(req, res) {
  usuariosModel.listarUltimoIdEmpresa()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      }
      else {
        res.status(204).send("Nenhum resultado de empresa encontrados");
      }
    }).catch(
      function (erro) {
        console.log("Houve um erro ao realizar a consulta! Erro:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );
}

function excluirUsuario(req, res) {
  var idUsuario = req.params.idUsuario;
  usuariosModel.excluirUsuario(idUsuario)
    .then(
      function (resultado) {
        res.json(resultado);
      }
    )
    .catch(
      function (erro) {
        console.log(erro);
        console.log("Houve um erro ao deletar o usuario: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );
}

function listarFuncionario(req, res) {

  var idUsuario = req.params.idUsuario;

  usuariosModel.listarFuncionario(idUsuario)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      }
      else {
        res.status(204).send("Nenhum resultado desse funcionário(a) encontrado");
      }
    }).catch(
      function (erro) {
        console.log("Houve um erro ao realizar a consulta! Erro:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );
}

function listarAgenciasVinculadas(req, res) {

  var idUsuario = req.params.idUsuario;

  usuariosModel.listarAgenciasVinculadas(idUsuario)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      }
      else {
        res.status(204).send("Nenhuma agência vinculada e esse funcionário(a) encontrada");
      }
    }).catch(
      function (erro) {
        console.log("Houve um erro ao realizar a consulta! Erro:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );
}

function listarAgenciasNaoVinculadas(req, res) {

  var idUsuario = req.params.idUsuario;
  var fkEmpresa = req.params.fkEmpresa;


  usuariosModel.listarAgenciasNaoVinculadas(idUsuario, fkEmpresa)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      }
      else {
        res.status(204).send("Nenhuma agência vinculada e esse funcionário(a) encontrada");
      }
    }).catch(
      function (erro) {
        console.log("Houve um erro ao realizar a consulta! Erro:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );
}

function desvincularAgencia(req, res) {
  var idUsuario = req.params.idUsuario;
  var idAgencia = req.params.idAgencia;

  usuariosModel.desvincularAgencia(idUsuario, idAgencia)
    .then(
      function (resultado) {
        res.json(resultado);
      }
    )
    .catch(
      function (erro) {
        console.log(erro);
        console.log("Houve um erro ao desvincular agência: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );
}

function vincularAgencia(req, res) {
  var idUsuario = req.body.idUsuarioServer;
  var idAgencia = req.body.idAgenciaServer;

  usuariosModel.vincularAgencia(idUsuario, idAgencia)
    .then(
      function (resultado) {
        res.json(resultado);
      }
    ).catch(
      function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao vincular a agência! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      }
    );

}

module.exports = {
  exibirTabelaUsuarios,
  cadastrarEmpresaGerente,
  cadastrarFuncionario,
  listarUltimoIdEmpresa,
  excluirUsuario,
  listarFuncionario,
  listarAgenciasVinculadas,
  listarAgenciasNaoVinculadas,
  desvincularAgencia,
  vincularAgencia
}