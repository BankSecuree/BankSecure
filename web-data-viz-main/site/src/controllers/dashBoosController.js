var dashBoosModel = require('../models/dashBoosModel')

function obterKpiAgencia(req, res) {
    console.log("Cheguei no controller")
    
    dashBoosModel.obterKpiAgencia()
    .then(function (resultado) {
        res.json(resultado)
    }).catch(
        function (erro) {
            console.log(erro)
            console.log("Erro" + erro.sqlMessage)
        }
    )
}

module.exports = {
    obterKpiAgencia   
};