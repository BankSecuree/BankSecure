var express = require("express");
var router = express.Router();

var dashAgenciasController = require("../controllers/dashAgenciasController");

router.get("/exibirListaAgencias/:idUsuario", function (req, res) {
    dashAgenciasController.exibirListaAgencias(req, res);
});


router.get("/getDadosMaquina/:idUsuario", function (req, res) {
    dashAgenciasController.getDadosMaquina(req, res);
});

module.exports = router;