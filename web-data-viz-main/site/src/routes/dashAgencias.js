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

router.get("/exibirView/:idUsuario/:idMaquina", function (req, res) {
    dashAgenciasController.exibirView(req, res);
});

router.get(`/consultarMaquinas/:idAgencia`, function (req, res){
    dashAgenciasController.consultarMaquinas(req, res);
})

router.get(`/consultarPeloTempo/:idMaquina/:inicio/:fim`, (req,res) => {
    dashAgenciasController.consultarPeloTempo(req, res);
})

router.post("/dadosAnalista", function (req, res) {
    // console.log("Cheguei na rota")
    dashAgenciasController.dadosAnalista(req, res);
});

router.post("/dadosCards", function (req, res) {
    dashAgenciasController.dadosCards(req, res);
});

router.post("/pegarMaquinas", function (req, res) {
    dashAgenciasController.pegarMaquinas(req, res);
});

router.post("/pegarDadosGerais", function (req, res) {
    dashAgenciasController.pegarDadosGerais(req, res);
});

module.exports = router;