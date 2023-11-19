var dashBoosModel = require('../models/dashBoosModel')

function obterKpiAgencia(req, res) {
    var idGerente = req.params.idGerente
    console.log("Cheguei no controller")

    dashBoosModel.obterKpiAgencia(idGerente)
        .then(function (resultado) {
            res.json(resultado)
        }).catch(
            function (erro) {
                console.log(erro)
                console.log("Erro" + erro.sqlMessage)
            }
        )
}


function buscarUltimasMedidas(req, res) {
    var idGerente = req.params.idGerente
    var componente = req.params.componente
    var tipoAgencia = req.params.tipoAgencia
    var selectTipoAgencia = req.params.selectTipoAgencia

    if (!idGerente || !componente || !selectTipoAgencia) {
        return res.status(400).json({ error: 'Parâmetros inválidos.' });
    }

    dashBoosModel.buscarUltimasMedidas(idGerente, componente, tipoAgencia, selectTipoAgencia).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado)
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro)
        console.log("Houve um erro ao buscar as ultimas medidas ", erro.sqlMessage)
        res.status(500).json(erro.sqlMessage)
    });
}

    function buscarMedidasEmTempoReal(req, res) {
        var idGerente = req.params.idGerente
        var componente = req.params.componente
        var tipoAgencia = req.params.tipoAgencia
        var selectTipoAgencia = req.params.selectTipoAgencia

        if(!grafico || !dados) {
            return res.status(400).json({error: 'Parametros invalidos'})
        }

        dashBoosModel.buscarMedidasEmTempoReal(idGerente,componente, tipoAgencia, selectTipoAgencia).then(function (resultado) {
            if(resultado.length > 0) {
                res.status(200).json(resultado)
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro)
            console.log("Houve um erro ao buscar as medidas em tempo real", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
        })
    }

module.exports = {
    obterKpiAgencia,
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
};