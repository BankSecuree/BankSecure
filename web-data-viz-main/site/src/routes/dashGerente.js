var express = require("express")
var router = express.Router();


var dashGerenteController = require("../controllers/dashGerenteController")

router.get("/dadosKpi/:idEmpresa/:periodo/:componente/:agencias", function (req, res) {
    console.log("Estou na rota")
    dashGerenteController.dadosKpi(req, res)
})

router.get("/ultimas/:idEmpresa/:periodo/:componente/:agencias", function (req, res) {
    console.log("Estou na rota")
    dashGerenteController.buscarUltimasMedidas(req, res);
});


router.get("/grafico-horario-de-pico/:idEmpresa", function(req, res){
    console.log("Acessando model horario de pico")
    dashGerenteController.horarioDePico(req,res)
})


module.exports = router;