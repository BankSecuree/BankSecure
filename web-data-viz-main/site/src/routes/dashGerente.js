var express = require("express")
var router = express.Router();


var dashGerenteController = require('../controllers/dashGerenteController')

router.get("/dadosKpi/:idEmpresa/:periodo/:componente", function (req, res) {
    console.log("Estou na rota")
    dashGerenteController.dadosKpi(req, res)
})

router.get("/ultimas/:idEmpresa/:periodo/:componente", function (req, res) {
    console.log("Estou na rota")
    dashGerenteController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idEmpresa/:periodo/:componente", function (req, res) {
    console.log("Estou na rota")
    dashGerenteController.buscarMedidasTempoReal(req, res)
})


module.exports = router;