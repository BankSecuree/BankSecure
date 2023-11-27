var dashGerenteModel = require('../models/dashGerenteModel');

function dadosKpi(req, res) {
    var idEmpresa = req.params.idEmpresa;
    var periodo = req.params.periodo;
    var componente = req.params.componente;
    var agencias = req.params.agencias;


    console.log("Cheguei ao controller")

    dashGerenteModel.dadosKpi(idEmpresa, periodo, componente, agencias)
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
    var agencias = req.params.agencias

    dashGerenteModel.buscarUltimasMedidas(idEmpresa, periodo, componente, agencias).then(function (resultado) {
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


function horarioDePico(req, res) {
    var idEmpresa = req.params.idEmpresa

    console.log("Recuperando dados de horario de pico")
    dashGerenteModel.horarioDePico(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.status(200).json(resultado);
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os dados de horario de pico.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    dadosKpi,
    buscarUltimasMedidas,
    horarioDePico

};