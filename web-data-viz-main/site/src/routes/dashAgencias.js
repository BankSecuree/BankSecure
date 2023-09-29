var express = require("express");
var router = express.Router();

var dashAgenciasController = require("../controllers/dashAgenciasController");

router.get("/exibirListaMaquinas/:idMaquina", function (req, res) {
    dashAgenciasController.exibirListaMaquinas(req, res);
});

router.get("/exibirListaAgencias/:idUsuario", function (req, res) {
    dashAgenciasController.exibirListaAgencias(req, res);
});

router.get("/graficoAgencia/:idAgencia", function (req, res) {
    dashAgenciasController.graficoAgencia(req, res);
});

router.get("/exibirView/:idMaquina", function (req, res) {
    dashAgenciasController.exibirView(req, res);
});

router.post("/dadosAnalista", function (req, res) {
    // console.log("Cheguei na rota")
    dashAgenciasController.dadosAnalista(req, res);
});

// router.post("/dadosCards", function (req, res) {
//     // console.log("Cheguei na rota")
//     dashAgenciasController.dadosCards(req, res);
// });

module.exports = router;