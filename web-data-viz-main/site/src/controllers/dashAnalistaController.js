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


  function dadosTemperatura(req,res){
    var idEmpresa = req.params.idEmpresa
    var fkMaquina = req.params.fkMaquina

    console.log("Cheguei na controller")


    if(idEmpresa==undefined){
      res.status(400).send("O id da empresa está undefined")
    } else{
      dashAnalistaModel.dadosTemperatura(idEmpresa,fkMaquina)
      .then(
        function(resultado){
          res.json(resultado);
        }

      ).catch(
          function (erro) {
            console.log("#################################################################################################################################")
            console.log(erro);
            console.log(
              "\nHouve um erro ao pegar dados de temperatura! Erro: ",
              erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
          }
        );
    }
  }


  function dadosPorcentagem(req,res){
    var idEmpresa = req.params.idEmpresa
    var fkMaquina = req.params.fkMaquina

    console.log("Cheguei na controller")


    if(idEmpresa==undefined){
      res.status(400).send("O id da empresa está undefined")
    } else{
      dashAnalistaModel.dadosPorcentagem(idEmpresa,fkMaquina)

      .then(
        function(resultado){
          res.json(resultado);
        }

      ).catch(
          function (erro) {
            console.log("#################################################################################################################################")
            console.log(erro);
            console.log(
              "\nHouve um erro ao pegar dados de Porcentagem! Erro: ",
              erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
          }
        );
    }
  }



  function kpiDadosTemperatura(req,res){
    var idEmpresa = req.params.idEmpresa;
    var idAgencia = req.params.idAgencia;
    var idMaquina = req.params.idMaquina;

    console.log("Cheguei na controller")


    if(idEmpresa==undefined){
      res.status(400).send("O id da empresa está undefined")
    }else if(idAgencia == undefined){
      res.status(400).send("O id da agencia está undefined")
    }else if(idMaquina == undefined){
      res.status(400).send("  $$$$$$$$$$$$$$$$$$$$$$$$$ essa porra de maquina ta indefinida")
  
    }else{
      dashAnalistaModel.kpiDadosTemperatura(idEmpresa,idAgencia,idMaquina)
      .then(
        function(resultado){
          res.json(resultado);
        }

      ).catch(
          function (erro) {
            console.log("#################################################################################################################################")
            console.log(erro);
            console.log(
              "\nHouve um erro ao pegar dados pra a kpiTemp! Erro: ",
              erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
          }
        );
    }
  }


  function kpiDadosUso(req,res){
    var idEmpresa = req.params.idEmpresa
    var idAgencia = req.params.idAgencia
    var idMaquina = req.params.idMaquina;

    console.log("Cheguei na controller")


    if(idEmpresa==undefined){
      res.status(400).send("O id da empresa está undefined")
    }else if(idAgencia == undefined){
      res.status(400).send("O id da agencia está undefined")
    }else{
      dashAnalistaModel.kpiDadosUso(idEmpresa,idAgencia,idMaquina)
      .then(
        function(resultado){
          res.json(resultado);
        }

      ).catch(
          function (erro) {
            console.log("#################################################################################################################################")
            console.log(erro);
            console.log(
              "\nHouve um erro ao pegar dados pra a kpiUso! Erro: ",
              erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
          }
        );
    }
  }


  function maiorTemperaturaRel(req,res){
    var idEmpresa = req.params.idEmpresa
    var idAgencia = req.params.idAgencia

    console.log("Cheguei na controller")


    if(idEmpresa==undefined){
      res.status(400).send("O id da empresa está undefined")
    }else if(idAgencia == undefined){
      res.status(400).send("O id da agencia está undefined")
    }else{
      dashAnalistaModel.maiorTemperaturaRel(idEmpresa,idAgencia)
      .then(
        function(resultado){
          res.json(resultado);
        }

      ).catch(
          function (erro) {
            console.log(erro);
            console.log(
              "\nHouve um erro ao pegar dados pra a maior temperatura! Erro: ",
              erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
          }
        );
    }
  }


  function maiorUsoRel(req,res){
    var idEmpresa = req.params.idEmpresa
    var idAgencia = req.params.idAgencia

    console.log("Cheguei na controller")


    if(idEmpresa==undefined){
      res.status(400).send("O id da empresa está undefined")
    }else if(idAgencia == undefined){
      res.status(400).send("O id da agencia está undefined")
    }else{

      dashAnalistaModel.maiorUsoRel(idEmpresa,idAgencia)
      .then(
        function(resultado){
          res.json(resultado);
        }

      ).catch(
          function (erro) {
            console.log(erro);
            console.log(
              "\nHouve um erro ao pegar dados para pegar o maior uso! Erro: ",
              erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
          }
        );
    }
  }

  function menorUsoRel(req,res){
    var idEmpresa = req.params.idEmpresa
    var idAgencia = req.params.idAgencia

    console.log("Cheguei na controller")


    if(idEmpresa==undefined){
      res.status(400).send("O id da empresa está undefined")
    }else if(idAgencia == undefined){
      res.status(400).send("O id da agencia está undefined")
    }else{

      dashAnalistaModel.menorUsoRel(idEmpresa,idAgencia)
      .then(
        function(resultado){
          res.json(resultado);
        }

      ).catch(
          function (erro) {
            console.log(erro);
            console.log(
              "\nHouve um erro ao pegar dados para pegar o maior uso! Erro: ",
              erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
          }
        );
    }
  }



  function menorTemperaturaRel(req,res){
    var idEmpresa = req.params.idEmpresa
    // var idAgencia = req.params.idAgencia
    var fkMaquina = req.params.fkMaquina

    console.log("Cheguei na controller")

    if(idEmpresa==undefined){
      res.status(400).send("O id da empresa está undefined")
    }else if(fkMaquina == undefined){
      res.status(400).send("O id da maquina está undefined")
    }else{
      dashAnalistaModel.menorTemperaturaRel(idEmpresa,fkMaquina)
      .then(
        function(resultado){
          res.json(resultado);
        }

      ).catch(
          function (erro) {
            console.log(erro);
            console.log(
              "\nHouve um erro ao pegar dados pra a MENOR temperatura! Erro: AAAAAAAAAAA",
              erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
          }
        );
    }
  }


  function mediaTemperaturaRel(req,res){
    var idEmpresa = req.params.idEmpresa
    var idAgencia = req.params.idAgencia

    console.log("Cheguei na controller")


    if(idEmpresa==undefined){
      res.status(400).send("O id da empresa está undefined")
    }else if(idAgencia == undefined){
      res.status(400).send("O id da agencia está undefined")
    }else{
      dashAnalistaModel.mediaTemperaturaRel(idEmpresa,idAgencia)
      .then(
        function(resultado){
          res.json(resultado);
        }

      ).catch(
          function (erro) {
            console.log(erro);
            console.log(
              "\nHouve um erro ao pegar dados pra a maior temperatura! Erro: ",
              erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
          }
        );
    }
  }


  function pegarNomeMaquina(req, res) {
    var idEmpresa = req.params.idEmpresa;
    var idAgencia = req.params.idAgencia;
    var fkMaquina = req.params.fkMaquina;
  
    console.log("Cheguei na controller");
  
    if (idEmpresa == undefined) {
      res.status(400).send("O id da empresa está undefined");
    } else if (fkMaquina == undefined) {
      res.status(400).send("O fk da maquina está undefined");
    } else {
      dashAnalistaModel.pegarNomeMaquina(idEmpresa, idAgencia)
        .then(
          function (resultado) {
            res.json(resultado);
          }
        )
        .catch(
          function (erro) {
            console.log(erro);
            console.log(
              "\nHouve um erro ao pegar dados para a maior temperatura! Erro: ",
              erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
          }
        );
    }
  }
  
  function mediaUsoRel(req,res){
    var idEmpresa = req.params.idEmpresa
    var idAgencia = req.params.idAgencia

    console.log("Cheguei na controller")


    if(idEmpresa==undefined){
      res.status(400).send("O id da empresa está undefined")
    }else if(idAgencia == undefined){
      res.status(400).send("O id da agencia está undefined")
    }else{
      dashAnalistaModel.mediaUsoRel(idEmpresa,idAgencia)
      .then(
        function(resultado){
          res.json(resultado);
        }

      ).catch(
          function (erro) {
            console.log(erro);
            console.log(
              "\nHouve um erro ao pegar dados pra a maior temperatura! Erro: ",
              erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
          }
        );
    }
  }


  module.exports = {
    dadosAnalista,
    dadosTemperatura,
    dadosPorcentagem,
    kpiDadosTemperatura,
    kpiDadosUso,
    maiorTemperaturaRel,
    maiorUsoRel, 
    menorTemperaturaRel,
    menorUsoRel,
    mediaTemperaturaRel,
    mediaUsoRel, 
    pegarNomeMaquina
  }