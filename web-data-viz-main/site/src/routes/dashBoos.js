var express = require("express")
var router = express.Router();

var dashBoosController = require('../controllers/dashBoosController')

router.get("/obterKpiAgencia", function(req, res) {
    console.log("Estou na rota")
    dashBoosController.obterKpiAgencia(req, res)
})

module.exports = router;
