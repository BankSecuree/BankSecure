var express = require("express");
var router = express.Router();

var dashAnalistaProcessoController = require("../controllers/dashAnalistaProcessoController");

router.post("/dadosAnalista", function (req, res) {
    // console.log("Cheguei na rota")
    dashAnalistaProcessoController.dadosAnalista(req, res);
});

router.post("/dadosCards", function (req, res) {
    dashAnalistaProcessoController.dadosCards(req, res);
});

module.exports = router;