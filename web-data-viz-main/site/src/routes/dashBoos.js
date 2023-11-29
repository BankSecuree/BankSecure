var express = require("express")
var router = express.Router();

var dashBoosController = require('../controllers/dashBoosController')

router.get("/obterKpiAgencia/:idGerente", function(req, res) {
    console.log("Estou na rota")
    dashBoosController.obterKpiAgencia(req, res)
})

router.get("/ultimas/:idGerente/:componente/:tipoAgencia/:selectTipoAgencia", function (req, res) {
    console.log("Estou na rota!")
    dashBoosController.buscarUltimasMedidas(req, res)
})

router.get("/tempo-real/:idGerente/:componente/:tipoAgencia/:selectTipoAgencia", function (req, res) {
    console.log("Estou na rota!")
    dashBoosController.buscarMedidasEmTempoReal
})

module.exports = router;
