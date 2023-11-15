var dashGerenteModel = require('../models/dashGerenteModel');

function dadosKpi(req, res) {
    var idEmpresa = req.params.idEmpresa;
    var periodo = req.params.periodo;
    var componente = req.params.componente;

    console.log("Cheguei ao controller")

    dashGerenteModel.dadosKpi(idEmpresa, periodo, componente)
        .then(function (resultado) {
            res.json(resultado);
        }).catch(
            function (erro) {
                console.log(erro)
                console.log("Erro" + erro.sqlMessage)

            }
        )
}


function buscarUltimasMedidas(req, res) {


    var idEmpresa = req.params.idEmpresa;
    var periodo = req.params.periodo;
    var componente = req.params.componente;

    dashGerenteModel.buscarUltimasMedidas(idEmpresa, periodo, componente).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro)
        console.log("Houve um erro ao buscar as ultimas medidas ", erro.sqlMessage)
        res.status(500).json(erro.sqlMessage)
    });
}

function buscarMedidasTempoReal(req, res) {
    var idEmpresa = req.params.idEmpresa
    var periodo = req.params.periodo
    var componente = req.params.componente

    console.log("Recuperando medidas em tempo real")
    dashGerenteModel.buscarMedidasTempoReal(idEmpresa, periodo, componente).then(function (resultado) {
        if (resultado.length > 0) {
        } else {
            res.status(200).json(resultado);
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function kpiCorrelacao(req, res) {
    var idEmpresa = req.params.idEmpresa
    var periodo = req.params.periodo

    console.log("Recuperando dados de correlação")
    dashGerenteModel.kpiCorrelacao(idEmpresa, periodo).then(function (resultado) {
        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.status(200).json(resultado);
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os dados de correlação.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    dadosKpi,
    buscarUltimasMedidas,
    buscarMedidasTempoReal,
    kpiCorrelacao

};