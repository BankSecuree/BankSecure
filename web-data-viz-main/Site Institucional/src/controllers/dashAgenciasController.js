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

/*function getDadosMaquina(res) {

  dahAgenciasModel.getDadosMaquina().then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar getDadosMaquina: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}*/

/*function atualizarDados(){
  
}*/

module.exports = {
  exibirListaAgencias 
  /*getDadosMaquina,
  atualizarDados*/
}