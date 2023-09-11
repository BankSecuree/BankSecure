var express = require("express");
var router = express.Router();

var dashAgenciasController = require("../controllers/dashAgenciasController");

router.get("/exibirListaAgencias/:idUsuario", function (req, res) {
    dashAgenciasController.exibirListaAgencias(req, res);
});


router.get("/getDadosMaquina/:idUsuario", function (req, res) {
    dashAgenciasController.getDadosMaquina(req, res);
});

router.get("/atualizarDados/:idUsuario", function (req, res) {
    dashAgenciasController.atualizarDados(req, res);
});

router.get("/exibirView/:idMaquina", function (req, res) {
    dashAgenciasController.exibirView(req, res);
});

module.exports = router;