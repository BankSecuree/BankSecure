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

function exibirListaMaquinas(req, res) {
  var idMaquina = req.params.idMaquina;

  dahAgenciasModel.exibirListaMaquinas(idMaquina).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar exibirListaMaquinas: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function exibirView(req, res) {
  var idUsuario = req.params.idUsuario;
  var idMaquina = req.params.idMaquina;

  dahAgenciasModel.exibirView(idUsuario, idMaquina).then(function (resultado) {
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

// Pega os dados para colocar na tela de dashboard do analista
function dadosAnalista(req, res) {
  var componente = req.body.componenteServer;
  var agencia = req.body.agenciaServer;

  console.log("To na controller")
  
  if (componente == undefined) {
    res.status(400).send("Seu componente está undefined!");
  } else if (agencia == undefined) {
    res.status(400).send("Seu agencia está undefined!");
  } else {
    dahAgenciasModel.dadosAnalista(agencia,componente)
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

function consultarMaquinas(req, res){
  var idAgencia = req.params.idAgencia;
  if (idAgencia == undefined) {
    res.status(400).send("Seu componente está undefined!");
  } else {
    dahAgenciasModel.consultarMaquinas(idAgencia)
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

function consultarPeloTempo(req, res){
  var idMaquina = req.params.idMaquina;
  var inicio = req.params.inicio;
  var fim = req.params.fim;

  if (idMaquina == undefined) {
    res.status(400).send("Seu idMaquina está undefined!");
  } else if(inicio == undefined){
    res.status(400).send("Seu inicio está undefined!");
  }else if(fim == undefined){
    res.status(400).send("Seu fim está undefined!");
  }else {
    dahAgenciasModel.consultarPeloTempo(idMaquina, inicio, fim)
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
  exibirListaMaquinas,
  dadosAnalista,
  exibirListaAgencias ,
  exibirView,
  graficoAgencia,
  consultarMaquinas,
  consultarPeloTempo
}