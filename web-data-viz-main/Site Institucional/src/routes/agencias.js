var express = require("express");
var router = express.Router();

var agenciasController = require("../controllers/agenciasController");

router.get("/exibirTabelaAgencias/:idEmpresa", function (req, res) {
    agenciasController.exibirTabelaAgencias(req, res);
});

router.get("/exibirQuantidadeFuncionariosAgencia/:idAgencia", function (req, res) {
    agenciasController.exibirQuantidadeFuncionariosAgencia(req, res);
});

router.post("/cadastrarAgencia", function (req, res) {
    agenciasController.cadastrarAgencia(req, res);
})

module.exports = router;