var express = require("express");
var router = express.Router();

var agenciasController = require("../controllers/agenciasController");

router.get("/exibirTabelaAgencias/:idEmpresa", function (req, res) {
    agenciasController.exibirTabelaAgencias(req, res);
});

router.post("/cadastrarAgencia", function (req, res) {
    agenciasController.cadastrarAgencia(req, res);
})

router.delete("/excluirAgencia/:idAgencia", function (req, res) {
    agenciasController.excluirAgencia(req, res);
});

router.get("/listarAgencia/:idAgencia", function (req, res) {
    agenciasController.listarAgencia(req, res);
});

router.post("/atualizarAgencia", function (req, res) {
    agenciasController.atualizarAgencia(req, res);
})

module.exports = router;